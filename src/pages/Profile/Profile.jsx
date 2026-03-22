import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UserContextObj } from "../../contexts/UserContext";
import { adminApi } from "../../api/api";
import navAvatar from "../../assets/img/nav-avatar.png";

const formatDate = (dateStr) => {
  try { return new Date(dateStr).toLocaleDateString(); } catch { return dateStr; }
};

function EditModal({ title, fields, values, onSave, onClose }) {
  const [form, setForm] = useState(values);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(form); onClose(); }
    catch (err) { alert(err?.response?.data?.message ?? "Failed to save"); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        <div className="space-y-3">
          {fields.map(({ label, key, type = "text" }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
              <input
                type={type}
                value={form[key] ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminRentsPanel() {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);

  const load = async () => {
    try { setRents(await adminApi.getAllRents()); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this rental?")) return;
    await adminApi.deleteRent(id);
    setRents((r) => r.filter((x) => x.id !== id));
  };

  const handleSave = async (form) => {
    await adminApi.updateRent(editTarget.id, {
      startDate: form.startDate,
      endDate: form.endDate,
    });
    setRents((r) =>
      r.map((x) => x.id === editTarget.id ? { ...x, startDate: form.startDate, endDate: form.endDate } : x)
    );
    setEditTarget(null);
  };

  return (
    <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-6 shadow-md">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">All Rentals</h2>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading…</p>
      ) : rents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">No rentals yet.</p>
      ) : (
        <div className="overflow-y-auto max-h-72 space-y-2 pr-1">
          {rents.map((r) => (
            <div key={r.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {r.car?.title ?? `Car #${r.carId}`}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(r.startDate)} — {formatDate(r.endDate)}
                </div>
                <div className="text-xs text-gray-400">
                  User #{r.userId} · ${r.totalAmount}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" onClick={() => setEditTarget(r)}
                  className="px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold">
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(r.id)}
                  className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editTarget && (
        <EditModal
          title="Edit Rental"
          fields={[
            { label: "Start Date", key: "startDate", type: "date" },
            { label: "End Date", key: "endDate", type: "date" },
          ]}
          values={{
            startDate: editTarget.startDate?.slice(0, 10) ?? "",
            endDate: editTarget.endDate?.slice(0, 10) ?? "",
          }}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}

function AdminUsersPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);

  const load = async () => {
    try { setUsers(await adminApi.getAllUsers()); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await adminApi.deleteUser(id);
    setUsers((u) => u.filter((x) => x._id !== id));
  };

  const handleSave = async (form) => {
    await adminApi.updateUser(editTarget._id, {
      firstName: form.firstName,
      lastName: form.lastName,
      displayName: form.displayName,
    });
    setUsers((u) =>
      u.map((x) => x._id === editTarget._id ? { ...x, ...form } : x)
    );
    setEditTarget(null);
  };

  return (
    <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-6 shadow-md">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">All Users</h2>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading…</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">No users yet.</p>
      ) : (
        <div className="overflow-y-auto max-h-72 space-y-2 pr-1">
          {users.map((u) => (
            <div key={u._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {u.displayName || `${u.firstName} ${u.lastName}`}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{u.email}</div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  u.role === "ADMIN"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                }`}>
                  {u.role}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" onClick={() => setEditTarget(u)}
                  className="px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold">
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(u._id)}
                  className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editTarget && (
        <EditModal
          title="Edit User"
          fields={[
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
            { label: "Display Name", key: "displayName" },
          ]}
          values={{
            firstName: editTarget.firstName ?? "",
            lastName: editTarget.lastName ?? "",
            displayName: editTarget.displayName ?? "",
          }}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}

export default function Profile() {
  const userObject = useContext(UserContextObj);
  const rentals = userObject?.rentals || [];
  const isAdmin = userObject?.role === "ADMIN";

  if (!userObject?._id) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
          <div className="padding-layout py-8 max-w-4xl mx-auto">
            <h1 className="h1-bold text-gray-900 dark:text-white mb-8">Profile</h1>
            <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-8 shadow-md">
              <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <div className="padding-layout py-8 max-w-4xl mx-auto space-y-8">
        <h1 className="h1-bold text-gray-900 dark:text-white">Profile</h1>

        <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-8 shadow-md">
          <img src={navAvatar} alt="User Avatar" className="w-24 h-24 rounded-full mb-4 object-cover" />
          <div className="mt-4 space-y-4">
            {[
              ["Display Name", userObject.displayName],
              ["First Name", userObject.firstName],
              ["Last Name", userObject.lastName],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-sm text-gray-400 mb-1">{label}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
              </div>
            ))}
            {isAdmin && (
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                ADMIN
              </span>
            )}
          </div>
        </div>

        {!isAdmin && (
          <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-8 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rental History</h2>
            {rentals.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">You have no rentals yet.</p>
            ) : (
              <div className="space-y-3">
                {rentals.map((rental) => (
                  <div key={rental.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 gap-2">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{rental.carTitle}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(rental.startDate)} — {formatDate(rental.endDate)}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-500 md:text-right">
                      {rental.totalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isAdmin && (
          <>
            <AdminRentsPanel />
            <AdminUsersPanel />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
