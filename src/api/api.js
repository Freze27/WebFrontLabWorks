import axios from 'axios';

const BASE_URL = 'https://car-rental-57ea.onrender.com';
const API_URL = `${BASE_URL}/api`;

const LS_TOKEN_KEY = 'auth_token';
const LS_USER_KEY  = 'auth_user';

// ── Axios instance ────────────────────────────────────────────────────────────

const http = axios.create({ baseURL: API_URL });

// Автоматически прокидываем JWT если он есть
http.interceptors.request.use((config) => {
  const token = localStorage.getItem(LS_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Маппинг: backend → frontend ──────────────────────────────────────────────
// Backend использует camelCase (id, title, brand, filePath, ...)
// Frontend ожидает snake_case с префиксом car_ (_id, car_title, ...)

const toFrontendCar = (car) => ({
  _id:              car.id,
  car_title:        car.title,
  car_brand:        car.brand,
  car_body_type:    car.category?.name ?? '',
  // Картинки отдаёт сам backend (public/ на Render)
  file_path:        BASE_URL + car.filePath,
  uploaded_car_image: BASE_URL + car.filePath,
  gallery_images:   (car.images ?? []).map((img) => BASE_URL + img.path),
  seat_capacity:    car.seatCapacity,
  horse_power:      car.horsePower,
  maximum_gasoline: car.maxGasoline,
  transmission_type: car.transmissionType,
  daily_rate:       car.dailyRate,
});

const toFrontendUser = (user) => ({
  _id:         user.id,
  email:       user.email,
  firstName:   user.firstName,
  lastName:    user.lastName,
  displayName: user.displayName,
  image:       user.image ?? 'https://via.placeholder.com/150',
  role:        user.role,
  // История аренд (приходит из GET /api/users/:id)
  rentals: (user.rents ?? []).map((r) => ({
    id:          r.id,
    carTitle:    r.car?.title ?? '',
    totalAmount: r.totalAmount,
    startDate:   r.startDate,
    endDate:     r.endDate,
  })),
});

// ── carApi ────────────────────────────────────────────────────────────────────

export const carApi = {
  /**
   * GET /api/cars
   * Поддерживает: page, limit, brand, categoryId, transmissionType, minRate, maxRate
   */
  getAllCars: async (query = '') => {
    const params = query
      ? { search: query }   // ← если понадобится, бэкенд поддерживает brand-фильтр
      : { limit: 50 };      // берём все авто за один запрос
    const { data } = await http.get('/cars', { params });
    const items = Array.isArray(data) ? data : (data.data ?? []);
    return { car: items.map(toFrontendCar) };
  },

  getCarById: async (carId) => {
    const { data } = await http.get(`/cars/${carId}`);
    return { car: toFrontendCar(data) };
  },

  createCar: async (carData) => {
    const { data } = await http.post('/cars', carData);
    return { car: toFrontendCar(data) };
  },

  updateCar: async (carId, carData) => {
    const { data } = await http.patch(`/cars/${carId}`, carData);
    return { car: toFrontendCar(data) };
  },

  deleteCar: async (carId) => {
    await http.delete(`/cars/${carId}`);
    return { message: 'Deleted the car' };
  },
};

// ── userApi ───────────────────────────────────────────────────────────────────

export const userApi = {
  /**
   * Читает пользователя из localStorage, затем обновляет из бэкенда
   * (чтобы история аренд всегда была актуальной).
   */
  getCurrentUser: async () => {
    const stored = localStorage.getItem(LS_USER_KEY);
    if (!stored) return null;

    const cached = JSON.parse(stored);

    try {
      // Запрашиваем свежие данные вместе с историей аренд
      const { data } = await http.get(`/users/${cached._id}`);
      const fresh = toFrontendUser(data);
      localStorage.setItem(LS_USER_KEY, JSON.stringify(fresh));
      return fresh;
    } catch {
      // Если бэкенд недоступен — возвращаем кэш
      return cached;
    }
  },

  setUser: (user) => {
    if (user) localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_USER_KEY);
  },

  logout: async () => {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_USER_KEY);
    return { success: true };
  },
};

// ── authApi ───────────────────────────────────────────────────────────────────

export const authApi = {
  register: async ({ firstName, lastName, email, password }) => {
    const displayName = `${firstName} ${lastName}`.trim();
    const { data } = await http.post('/auth/register', {
      firstName,
      lastName,
      displayName,
      email,
      password,
    });
    const user = toFrontendUser(data.user);
    localStorage.setItem(LS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
    return { user };
  },

  login: async (email, password) => {
    const { data } = await http.post('/auth/login', { email, password });
    const user = toFrontendUser(data.user);
    localStorage.setItem(LS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
    return { user };
  },
};

// ── rentApi ───────────────────────────────────────────────────────────────────

export const rentApi = {
  /**
   * POST /api/rents
   * userId берётся из токена на бэкенде, но DTO требует его явно.
   */
  createRent: async ({ userId, carId, startDate, endDate, totalAmount }) => {
    const { data } = await http.post('/rents', {
      userId,
      carId,
      startDate: new Date(startDate).toISOString(),
      endDate:   new Date(endDate).toISOString(),
      totalAmount,
    });
    return data;
  },
};

// ── stripeApi (заглушка — Stripe не подключён) ────────────────────────────────

export const stripeApi = {
  createSession: async () => ({
    id:         'session_' + Date.now(),
    url:        window.location.origin + '/success',
    cancel_url: window.location.origin + '/canceled',
  }),
};

export const adminApi = {
  getAllRents: async (limit = 100) => {
    const { data } = await http.get('/rents', { params: { limit } });
    return Array.isArray(data) ? data : (data.data ?? []);
  },
  updateRent: async (id, dto) => {
    const { data } = await http.patch(`/rents/${id}`, dto);
    return data;
  },
  deleteRent: async (id) => {
    await http.delete(`/rents/${id}`);
  },
  getAllUsers: async (limit = 100) => {
    const { data } = await http.get('/users', { params: { limit } });
    const items = Array.isArray(data) ? data : (data.data ?? []);
    return items.map(toFrontendUser);
  },
  updateUser: async (id, dto) => {
    const { data } = await http.patch(`/users/${id}`, dto);
    return data;
  },
  deleteUser: async (id) => {
    await http.delete(`/users/${id}`);
  },
};

export default { carApi, userApi, authApi, rentApi, adminApi, stripeApi };
