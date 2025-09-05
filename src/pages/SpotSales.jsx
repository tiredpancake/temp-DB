import { useEffect, useState } from "react";
import api from "../api/api.js";

const SpotSales = () => {
  const [spotSales, setSpotSales] = useState([]);
  const [form, setForm] = useState({ planId: "", spotPrice: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSpotSales();
  }, []);

  const fetchSpotSales = async () => {
    try {
      const res = await api.get("/spotsales");
      setSpotSales(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/spotsales/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/spotsales", form);
      }
      setForm({ planId: "", spotPrice: "" });
      fetchSpotSales();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = sale => {
    setForm({ planId: sale.planId, spotPrice: sale.spotPrice });
    setEditingId(sale.planId);
  };

  const handleDelete = async planId => {
    try {
      await api.delete(`/spotsales/${planId}`);
      fetchSpotSales();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Spot Sales</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          name="planId"
          placeholder="Plan ID"
          value={form.planId}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled={editingId !== null} // disable PlanId when editing
        />
        <input
          name="spotPrice"
          placeholder="Spot Price"
          value={form.spotPrice}
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
              <th className="py-2 px-4 border">Spot Price</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spotSales.map(sale => (
              <tr key={sale.planId}>
                <td className="py-2 px-4 border">{sale.planId}</td>
                <td className="py-2 px-4 border">{sale.spotPrice}</td>
                <td className="py-2 px-4 border flex gap-2">
                  <button
                    onClick={() => handleEdit(sale)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sale.planId)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {spotSales.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4">No spot sales found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpotSales;
