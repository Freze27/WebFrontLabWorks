const mockCars = [
  {
    _id: 1,
    car_title: "Porsche 911 Carrera S",
    car_brand: "Porsche",
    car_body_type: "Sport",
    file_path: "/cars/911/outside.webp",
    gallery_images: [
      "/cars/911/front.webp",
      "/cars/911/inside.webp",
      "/cars/911/back.webp",
    ],
    seat_capacity: 4,
    horse_power: 443,
    maximum_gasoline: 67,
    transmission_type: "Automatic",
    daily_rate: 230,
    uploaded_car_image: "/cars/911/outside.webp",
  },
  {
    _id: 2,
    car_title: "Porsche Cayenne Turbo",
    car_brand: "Porsche",
    car_body_type: "SUV",
    file_path: "/cars/caynne/outside.webp",
    gallery_images: [
      "/cars/caynne/front.webp",
      "/cars/caynne/inside.webp",
      "/cars/caynne/back.webp",
    ],
    seat_capacity: 5,
    horse_power: 541,
    maximum_gasoline: 90,
    transmission_type: "Automatic",
    daily_rate: 195,
    uploaded_car_image: "/cars/caynne/outside.webp",
  },
  {
    _id: 3,
    car_title: "Bentley Continental GT",
    car_brand: "Bentley",
    car_body_type: "Coupe",
    file_path: "/cars/continental/outside.webp",
    gallery_images: [
      "/cars/continental/front.webp",
      "/cars/continental/inside.webp",
      "/cars/continental/back.webp",
    ],
    seat_capacity: 4,
    horse_power: 542,
    maximum_gasoline: 90,
    transmission_type: "Automatic",
    daily_rate: 255,
    uploaded_car_image: "/cars/continental/outside.webp",
  },
  {
    _id: 4,
    car_title: "Dodge Challenger Hellcat",
    car_brand: "Dodge",
    car_body_type: "Sport",
    file_path: "/cars/hellcat/outside.webp",
    gallery_images: [
      "/cars/hellcat/front.webp",
      "/cars/hellcat/inside.webp",
      "/cars/hellcat/back.webp",
    ],
    seat_capacity: 4,
    horse_power: 717,
    maximum_gasoline: 83,
    transmission_type: "Automatic",
    daily_rate: 205,
    uploaded_car_image: "/cars/hellcat/outside.webp",
  },
  {
    _id: 5,
    car_title: "BMW iX xDrive50",
    car_brand: "BMW",
    car_body_type: "SUV",
    file_path: "/cars/ix/outside.webp",
    gallery_images: [
      "/cars/ix/front.webp",
      "/cars/ix/inside.webp",
      "/cars/ix/back.webp",
    ],
    seat_capacity: 5,
    horse_power: 516,
    maximum_gasoline: 0,
    transmission_type: "Automatic",
    daily_rate: 185,
    uploaded_car_image: "/cars/ix/outside.webp",
  },
  {
    _id: 6,
    car_title: "BMW M5 Competition",
    car_brand: "BMW",
    car_body_type: "Sedan",
    file_path: "/cars/m5/outside.webp",
    gallery_images: [
      "/cars/m5/front.webp",
      "/cars/m5/inside.webp",
      "/cars/m5/back.webp",
    ],
    seat_capacity: 5,
    horse_power: 617,
    maximum_gasoline: 68,
    transmission_type: "Automatic",
    daily_rate: 215,
    uploaded_car_image: "/cars/m5/outside.webp",
  },
  {
    _id: 7,
    car_title: "Mercedes-AMG SL63",
    car_brand: "Mercedes-Benz",
    car_body_type: "Coupe",
    file_path: "/cars/sl63/outside.webp",
    gallery_images: [
      "/cars/sl63/front.webp",
      "/cars/sl63/inside.webp",
      "/cars/sl63/back.webp",
    ],
    seat_capacity: 2,
    horse_power: 577,
    maximum_gasoline: 70,
    transmission_type: "Automatic",
    daily_rate: 240,
    uploaded_car_image: "/cars/sl63/outside.webp",
  },
  {
    _id: 8,
    car_title: "Volkswagen Touareg R-Line",
    car_brand: "Volkswagen",
    car_body_type: "SUV",
    file_path: "/cars/touareg/outside.webp",
    gallery_images: [
      "/cars/touareg/front.webp",
      "/cars/touareg/inside.webp",
      "/cars/touareg/back.webp",
    ],
    seat_capacity: 5,
    horse_power: 335,
    maximum_gasoline: 75,
    transmission_type: "Automatic",
    daily_rate: 165,
    uploaded_car_image: "/cars/touareg/outside.webp",
  },
];

const LS_USER_KEY = "mock_user";

const demoAccount = {
  _id: "user_demo",
  email: "demo@demo.com",
  firstName: "Demo",
  lastName: "User",
  displayName: "Demo User",
  password: "demo1234",
  image: "https://via.placeholder.com/150",
  rentals: [
    {
      id: "rental_1",
      carTitle: "Porsche 911 Carrera S",
      totalAmount: 1150,
      startDate: "2025-02-10",
      endDate: "2025-02-15",
    },
    {
      id: "rental_2",
      carTitle: "BMW M5 Competition",
      totalAmount: 645,
      startDate: "2025-03-01",
      endDate: "2025-03-04",
    },
  ],
};

let mockUser = null;
try {
  const stored = localStorage.getItem(LS_USER_KEY);
  mockUser = stored ? JSON.parse(stored) : null;
} catch (e) {
  mockUser = null;
}

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const carApi = {
  getAllCars: async (query = "") => {
    await delay();
    if (query) {
      const searchResults = mockCars.filter(
        (car) =>
          car.car_brand.toLowerCase().includes(query.toLowerCase()) ||
          car.car_title.toLowerCase().includes(query.toLowerCase())
      );
      return { car: searchResults };
    }
    return { car: mockCars };
  },

  getCarById: async (carId) => {
    await delay();
    const car = mockCars.find(c => c._id === parseInt(carId));
    if (car) {
      return { car };
    }
    throw new Error("Car not found");
  },

  createCar: async (carData) => {
    await delay();
    const newCar = {
      _id: mockCars.length + 1,
      ...carData,
      isFavourite: false
    };
    mockCars.push(newCar);
    return { car: newCar };
  },

  updateCar: async (carId, carData) => {
    await delay();
    const index = mockCars.findIndex(c => c._id === parseInt(carId));
    if (index !== -1) {
      mockCars[index] = { ...mockCars[index], ...carData };
      return { car: mockCars[index] };
    }
    throw new Error("Car not found");
  },

  deleteCar: async (carId) => {
    await delay();
    const index = mockCars.findIndex(c => c._id === parseInt(carId));
    if (index !== -1) {
      const deletedCar = mockCars.splice(index, 1)[0];
      return { car: deletedCar, message: "Deleted the car" };
    }
    throw new Error("No car by that id was found");
  }
};

export const userApi = {
  getCurrentUser: async () => {
    await delay();
    return mockUser;
  },

  getUserById: async (userId) => {
    await delay();
    if (mockUser && mockUser._id === userId) {
      return { user: mockUser };
    }
    throw new Error("User was not found");
  },

  setUser: (user) => {
    mockUser = user;
    try {
      if (user) localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(LS_USER_KEY);
    } catch (e) {
    }
  },

  logout: async () => {
    await delay();
    mockUser = null;
    try {
      localStorage.removeItem(LS_USER_KEY);
    } catch (e) {}
    return { success: true };
  }
};

export const authApi = {
  register: async ({ firstName, lastName, email, password }) => {
    await delay();
    mockUser = {
      _id: 'user_' + Date.now(),
      email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`.trim(),
      password,
      image: 'https://via.placeholder.com/150',
      rentals: []
    };
    try { localStorage.setItem(LS_USER_KEY, JSON.stringify(mockUser)); } catch (e) {}
    return { user: mockUser };
  },

  login: async (email, password) => {
    await delay();
    if (mockUser && mockUser.email === email && mockUser.password === password) {
      try { localStorage.setItem(LS_USER_KEY, JSON.stringify(mockUser)); } catch (e) {}
      return { user: mockUser };
    }

    if (email === demoAccount.email && password === demoAccount.password) {
      mockUser = { ...demoAccount };
      try { localStorage.setItem(LS_USER_KEY, JSON.stringify(mockUser)); } catch (e) {}
      return { user: mockUser };
    }

    return Promise.reject(new Error('Invalid credentials'));
  },
};

export const stripeApi = {
  createSession: async (carData) => {
    await delay(1000);
    return {
      id: "session_" + Date.now(),
      url: window.location.origin + "/success",
      cancel_url: window.location.origin + "/canceled"
    };
  }
};

export default {
  carApi,
  userApi,
  authApi,
  stripeApi
};

