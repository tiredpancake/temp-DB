import { useEffect, useState } from "react";
import api from "../api/api.js";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [form, setForm] = useState({
    cancelationCondition: "",
    deliveryCondition: "",
    carId: "",
    customerId: "",
    companyId: "",
    planId: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => { fetchContracts(); }, []);

  const fetchContracts = async () => {
    try {
      const res = await api.get("/contracts");
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/contracts", {
        ...form,
        carId: parseInt(form.carId),
        customerId: parseInt(form.customerId),
        companyId: parseInt(form.companyId),
        planId: parseInt(form.planId)
      });
      setForm({ cancelationCondition: "", deliveryCondition: "", carId: "", customerId: "", companyId: "", planId: "" });
      fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = contract => {
    setEditingId(contract.id);
    setEditForm({
      cancelationCondition: contract.cancelationCondition,
      deliveryCondition: contract.deliveryCondition,
      carId: contract.carId,
      customerId: contract.customerId,
      companyId: contract.companyId,
      planId: contract.planId
    });
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdate = async id => {
    try {
      await api.put(`/contracts/${id}`, {
        ...editForm,
        carId: parseInt(editForm.carId),
        customerId: parseInt(editForm.customerId),
        companyId: parseInt(editForm.companyId),
        planId: parseInt(editForm.planId)
      });
      setEditingId(null);
      fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/contracts/${id}`);
      fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Contracts</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-3">
        <input name="cancelationCondition" placeholder="Cancelation Condition" value={form.cancelationCondition} onChange={handleChange} className="border p-2 rounded"/>
        <input name="deliveryCondition" placeholder="Delivery Condition" value={form.deliveryCondition} onChange={handleChange} className="border p-2 rounded"/>
        <input name="carId" placeholder="Car ID" value={form.carId} onChange={handleChange} className="border p-2 rounded"/>
        <input name="customerId" placeholder="Customer ID" value={form.customerId} onChange={handleChange} className="border p-2 rounded"/>
        <input name="companyId" placeholder="Company ID" value={form.companyId} onChange={handleChange} className="border p-2 rounded"/>
        <input name="planId" placeholder="Plan ID" value={form.planId} onChange={handleChange} className="border p-2 rounded"/>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded col-span-1 md:col-span-1">Add</button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Cancelation</th>
              <th className="py-2 px-4 border">Delivery</th>
              <th className="py-2 px-4 border">Car Model</th>
              <th className="py-2 px-4 border">Customer Name</th>
              <th className="py-2 px-4 border">Company Name</th>
              <th className="py-2 px-4 border">Plan ID</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(c => (
              <tr key={c.id}>
                <td className="py-2 px-4 border">{c.id}</td>

                {editingId === c.id ? (
                  <>
                    <td className="py-2 px-4 border"><input name="cancelationCondition" value={editForm.cancelationCondition} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="deliveryCondition" value={editForm.deliveryCondition} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="carId" value={editForm.carId} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="customerId" value={editForm.customerId} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="companyId" value={editForm.companyId} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="planId" value={editForm.planId} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => handleUpdate(c.id)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Save</button>
                      <button onClick={cancelEditing} className="bg-gray-400 hover:bg-gray-600 text-white py-1 px-2 rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{c.cancelationCondition}</td>
                    <td className="py-2 px-4 border">{c.deliveryCondition}</td>
                    <td className="py-2 px-4 border">{c.carModel}</td>
                    <td className="py-2 px-4 border">{c.customerName}</td>
                    <td className="py-2 px-4 border">{c.companyName}</td>
                    <td className="py-2 px-4 border">{c.planId}</td>
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

export default Contracts;
