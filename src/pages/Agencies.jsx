import { useEffect, useState } from "react";
import api from "../api/api.js";

const Agencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [form, setForm] = useState({ phoneNumber: "", city: "", officeAddress: "" });
  const [editingId, setEditingId] = useState(null); // track which agency is being edited
  const [editForm, setEditForm] = useState({ phoneNumber: "", city: "", officeAddress: "" });

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    const res = await api.get("/agencies");
    setAgencies(res.data);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/agencies", form);
    setForm({ phoneNumber: "", city: "", officeAddress: "" });
    fetchAgencies();
  };

  const handleDelete = async id => {
    await api.delete(`/agencies/${id}`);
    fetchAgencies();
  };

  const startEditing = agency => {
    setEditingId(agency.id);
    setEditForm({
      phoneNumber: agency.phoneNumber,
      city: agency.city,
      officeAddress: agency.officeAddress
    });
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdate = async id => {
    await api.put(`/agencies/${id}`, editForm);
    setEditingId(null);
    fetchAgencies();
  };

  return (
    <div className="container mx-auto mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-6">Agencies</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3 ">
        <input name="phoneNumber" placeholder="Phone" value={form.phoneNumber} onChange={handleChange} className="border p-2 rounded"/>
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded"/>
        <input name="officeAddress" placeholder="Address" value={form.officeAddress} onChange={handleChange} className="border p-2 rounded"/>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded">Add</button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map(a => (
              <tr key={a.id}>
                <td className="py-2 px-4 border">{a.id}</td>
                
                {/* Editable row */}
                {editingId === a.id ? (
                  <>
                    <td className="py-2 px-4 border">
                      <input name="phoneNumber" value={editForm.phoneNumber} onChange={handleEditChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="city" value={editForm.city} onChange={handleEditChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="officeAddress" value={editForm.officeAddress} onChange={handleEditChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => handleUpdate(a.id)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Save</button>
                      <button onClick={cancelEditing} className="bg-gray-400 hover:bg-gray-600 text-white py-1 px-2 rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{a.phoneNumber}</td>
                    <td className="py-2 px-4 border">{a.city}</td>
                    <td className="py-2 px-4 border">{a.officeAddress}</td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => startEditing(a)} className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded">Edit</button>
                      <button onClick={() => handleDelete(a.id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agencies;
