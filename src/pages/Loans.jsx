import { useEffect, useState } from "react";
import api from "../api/api.js";

const Loan = () => {
  const [loans, setLoans] = useState([]);
  const [form, setForm] = useState({
    planId: "",
    loansId: "",
    price: "",
    dueDate: "",
    paymentPenalty: ""
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await api.get("/loans");
      setLoans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/loans/${editing.planId}/${editing.loansId}`, {
          price: form.price,
          dueDate: form.dueDate,
          paymentPenalty: form.paymentPenalty
        });
        setEditing(null);
      } else {
        await api.post("/loans", form);
      }
      setForm({ planId: "", loansId: "", price: "", dueDate: "", paymentPenalty: "" });
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = loan => {
    setForm({
      planId: loan.planId,
      loansId: loan.loansId,
      price: loan.price,
      dueDate: loan.dueDate?.split("T")[0] ?? "",
      paymentPenalty: loan.paymentPenalty
    });
    setEditing({ planId: loan.planId, loansId: loan.loansId });
  };

  const handleDelete = async (planId, loansId) => {
    try {
      await api.delete(`/loans/${planId}/${loansId}`);
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Loans</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          name="planId"
          placeholder="Plan ID"
          value={form.planId}
          onChange={handleChange}
          disabled={!!editing}
          className="border p-2 rounded"
        />
        <input
          name="loansId"
          placeholder="Loan ID"
          value={form.loansId}
          onChange={handleChange}
          disabled={!!editing}
          className="border p-2 rounded"
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="paymentPenalty"
          placeholder="Penalty"
          value={form.paymentPenalty}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded col-span-1">
          {editing ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Plan ID</th>
              <th className="py-2 px-4 border">Loan ID</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Due Date</th>
              <th className="py-2 px-4 border">Penalty</th>
              <th className="py-2 px-4 border">Car Price</th>
              <th className="py-2 px-4 border">Interest Rate</th>
              <th className="py-2 px-4 border">Partnership Interest</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(l => (
              <tr key={`${l.planId}-${l.loansId}`}>
                <td className="py-2 px-4 border">{l.planId}</td>
                <td className="py-2 px-4 border">{l.loansId}</td>
                <td className="py-2 px-4 border">{l.price}</td>
                <td className="py-2 px-4 border">{l.dueDate?.split("T")[0]}</td>
                <td className="py-2 px-4 border">{l.paymentPenalty}</td>
                <td className="py-2 px-4 border">{l.carPrice}</td>
                <td className="py-2 px-4 border">{l.interestRate}</td>
                <td className="py-2 px-4 border">{l.partnershipInterest}</td>
                <td className="py-2 px-4 border flex gap-2">
                  <button
                    onClick={() => handleEdit(l)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(l.planId, l.loansId)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {loans.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No loans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Loan;
