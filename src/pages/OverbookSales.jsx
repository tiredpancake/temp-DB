import { useEffect, useState } from "react";
import api from "../api/api.js";

const OverbookSales = () => {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ planId: "", advancePayment: "", terminalPrice: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/overbooksales"); // GET all OverbookSales
      setSales(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/overbooksales/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/overbooksales", form);
      }
      setForm({ planId: "", advancePayment: "", terminalPrice: "" });
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = sale => {
    setForm({
      planId: sale.planId,
      advancePayment: sale.advancePayment,
      terminalPrice: sale.terminalPrice
    });
    setEditingId(sale.planId);
  };

  const handleDelete = async planId => {
    try {
      await api.delete(`/overbooksales/${planId}`);
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Overbook Sales</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          name="planId"
          placeholder="Plan ID"
          value={form.planId}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled={editingId !== null} // disable when editing
        />
        <input
          name="advancePayment"
          placeholder="Advance Payment"
          value={form.advancePayment}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="terminalPrice"
          placeholder="Terminal Price"
          value={form.terminalPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Plan ID</th>
              <th className="py-2 px-4 border">Advance Payment</th>
              <th className="py-2 px-4 border">Terminal Price</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(p => (
              <tr key={p.planId}>
                <td className="py-2 px-4 border">{p.planId}</td>
                <td className="py-2 px-4 border">{p.advancePayment}</td>
                <td className="py-2 px-4 border">{p.terminalPrice}</td>
                <td className="py-2 px-4 border flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.planId)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">No overbook sales found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverbookSales;
