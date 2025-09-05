import { useEffect, useState } from "react";
import api from "../api/api.js";

const InstallmentSales = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    planId: "",
    interestRate: "",
    carPrice: "",
    partnershipInterest: "",
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/installmentsales");
      setSales(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (planId) => {
    try {
      await api.delete(`/installmentsales/${planId}`);
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/installmentsales", formData);
      setFormData({
        planId: "",
        interestRate: "",
        carPrice: "",
        partnershipInterest: "",
      });
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Installment Sales</h2>

      {/* Add Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-6 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            name="planId"
            placeholder="Plan ID"
            value={formData.planId}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate"
            value={formData.interestRate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="carPrice"
            placeholder="Car Price"
            value={formData.carPrice}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="partnershipInterest"
            placeholder="Partnership Interest"
            value={formData.partnershipInterest}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Installment Sale
        </button>
      </form>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Plan ID</th>
              <th className="py-2 px-4 border">Interest Rate</th>
              <th className="py-2 px-4 border">Car Price</th>
              <th className="py-2 px-4 border">Partnership Interest</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.planId}>
                <td className="py-2 px-4 border">{s.planId}</td>
                <td className="py-2 px-4 border">{s.interestRate}</td>
                <td className="py-2 px-4 border">{s.carPrice}</td>
                <td className="py-2 px-4 border">{s.partnershipInterest}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(s.planId)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Installment Sales Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstallmentSales;
