import { useEffect, useState } from "react";
import api from "../api/api.js";

const SellingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    capacity: "",
    registrationCondition: "",
    companyId: "",
    registrationDeadline: "",
    cancelationBenefit: ""
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await api.get("/sellingplans");
    setPlans(res.data);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/sellingplans", form);
    setForm({ capacity: "", registrationCondition: "", companyId: "", registrationDeadline: "", cancelationBenefit: "" });
    fetchPlans();
  };

  const handleDelete = async id => {
    await api.delete(`/sellingplans/${id}`);
    fetchPlans();
  };

  return (
    <div className="container mx-auto mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-6">Selling Plans</h2>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} className="border p-2 rounded"/>
        <input name="registrationCondition" placeholder="Registration Condition" value={form.registrationCondition} onChange={handleChange} className="border p-2 rounded"/>
        <input name="companyId" placeholder="Company ID" value={form.companyId} onChange={handleChange} className="border p-2 rounded"/>
        <input type="date" name="registrationDeadline" placeholder="Deadline" value={form.registrationDeadline} onChange={handleChange} className="border p-2 rounded"/>
        <input name="cancelationBenefit" placeholder="Cancelation Benefit" value={form.cancelationBenefit} onChange={handleChange} className="border p-2 rounded"/>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded col-span-full md:col-span-1">Add Plan</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Capacity</th>
              <th className="py-2 px-4 border">Condition</th>
              <th className="py-2 px-4 border">Company</th>
              <th className="py-2 px-4 border">Deadline</th>
              <th className="py-2 px-4 border">Cancel Benefit</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(p => (
              <tr key={p.id}>
                <td className="py-2 px-4 border">{p.id}</td>
                <td className="py-2 px-4 border">{p.capacity}</td>
                <td className="py-2 px-4 border">{p.registrationCondition}</td>
                <td className="py-2 px-4 border">{p.companyName}</td>
                <td className="py-2 px-4 border">{new Date(p.registrationDeadline).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{p.cancelationBenefit}</td>
                <td className="py-2 px-4 border">{p.planType}</td>
                <td className="py-2 px-4 border">
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellingPlans;
