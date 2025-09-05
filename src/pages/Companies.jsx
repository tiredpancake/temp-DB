import { useEffect, useState } from "react";
import api from "../api/api.js";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ name: "", website: "", centralOfficeAddress: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => { fetchCompanies(); }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/companies", form);
      setForm({ name: "", website: "", centralOfficeAddress: "" });
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/companies/${id}`);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = company => {
    setEditingId(company.id);
    setEditForm({ ...company });
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdate = async id => {
    try {
      await api.put(`/companies/${id}`, editForm);
      setEditingId(null);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 mb-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Companies</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input name="name" placeholder="Company Name" value={form.name} onChange={handleChange} className="border p-2 rounded"/>
        <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="border p-2 rounded"/>
        <input name="centralOfficeAddress" placeholder="Central Office Address" value={form.centralOfficeAddress} onChange={handleChange} className="border p-2 rounded"/>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded">Add</button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Website</th>
              <th className="py-2 px-4 border">Central Office Address</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td className="py-2 px-4 border">{c.id}</td>

                {editingId === c.id ? (
                  <>
                    <td className="py-2 px-4 border">
                      <input name="name" value={editForm.name} onChange={handleEditChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="website" value={editForm.website} onChange={handleEditChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="centralOfficeAddress" value={editForm.centralOfficeAddress} onChange={handleEditChange} className="border p-1 rounded w-full"/>
                    </td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => handleUpdate(c.id)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Save</button>
                      <button onClick={cancelEditing} className="bg-gray-400 hover:bg-gray-600 text-white py-1 px-2 rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{c.name}</td>
                    <td className="py-2 px-4 border">{c.website}</td>
                    <td className="py-2 px-4 border">{c.centralOfficeAddress}</td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => startEditing(c)} className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded">Edit</button>
                      <button onClick={() => handleDelete(c.id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
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

export default Companies;
