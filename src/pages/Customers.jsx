import { useEffect, useState } from "react";
import api from "../api/api.js";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    nationalId: "", name: "", lastName: "", agencyId: "", city: "", homeAddress: "", age: "", personalInformation: "", phoneNumber: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/customers", form);
    setForm({ nationalId: "", name: "", lastName: "", agencyId: "", city: "", homeAddress: "", age: "", personalInformation: "", phoneNumber: "" });
    fetchCustomers();
  };

  const handleDelete = async id => {
    await api.delete(`/customers/${id}`);
    fetchCustomers();
  };

  const startEditing = customer => {
    setEditingId(customer.id);
    setEditForm({ ...customer });
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdate = async id => {
    await api.put(`/customers/${id}`, editForm);
    setEditingId(null);
    fetchCustomers();
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Customers</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input name="nationalId" placeholder="National ID" value={form.nationalId} onChange={handleChange} className="border p-2 rounded"/>
        <input name="name" placeholder="First Name" value={form.name} onChange={handleChange} className="border p-2 rounded"/>
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 rounded"/>
        <input name="agencyId" placeholder="Agency ID" value={form.agencyId} onChange={handleChange} className="border p-2 rounded"/>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded">Add</button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">National ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Last Name</th>
              <th className="py-2 px-4 border">Agency ID</th>
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">Home Address</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Personal Info</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td className="py-2 px-4 border">{c.id}</td>

                {editingId === c.id ? (
                  <>
                    <td className="py-2 px-4 border"><input name="nationalId" value={editForm.nationalId} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="name" value={editForm.name} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="lastName" value={editForm.lastName} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="agencyId" value={editForm.agencyId} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="city" value={editForm.city} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="homeAddress" value={editForm.homeAddress} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="age" value={editForm.age} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="personalInformation" value={editForm.personalInformation} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="phoneNumber" value={editForm.phoneNumber} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => handleUpdate(c.id)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Save</button>
                      <button onClick={cancelEditing} className="bg-gray-400 hover:bg-gray-600 text-white py-1 px-2 rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{c.nationalId}</td>
                    <td className="py-2 px-4 border">{c.name}</td>
                    <td className="py-2 px-4 border">{c.lastName}</td>
                    <td className="py-2 px-4 border">{c.agencyId}</td>
                    <td className="py-2 px-4 border">{c.city}</td>
                    <td className="py-2 px-4 border">{c.homeAddress}</td>
                    <td className="py-2 px-4 border">{c.age}</td>
                    <td className="py-2 px-4 border">{c.personalInformation}</td>
                    <td className="py-2 px-4 border">{c.phoneNumber}</td>
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

export default Customers;
