import { useEffect, useState } from "react";
import api from "../api/api.js";

const Have = () => {
  const [relations, setRelations] = useState([]);
  const [form, setForm] = useState({ planId: "", carId: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchRelations();
  }, []);

  const fetchRelations = async () => {
    try {
      const res = await api.get("/have");
      setRelations(res.data);
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
        await api.put(`/have/${editing.planId}/${editing.carId}`, {
          newPlanId: form.planId,
          newCarId: form.carId
        });
        setEditing(null);
      } else {
        await api.post("/have", form);
      }
      setForm({ planId: "", carId: "" });
      fetchRelations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = item => {
    setForm({ planId: item.planId, carId: item.carId });
    setEditing({ planId: item.planId, carId: item.carId });
  };

  const handleDelete = async (planId, carId) => {
    try {
      await api.delete(`/have/${planId}/${carId}`);
      fetchRelations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Have (Plans & Cars)</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {/* <input
          name="planId"
          placeholder="Plan ID"
          value={form.planId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="carId"
          placeholder="Car ID"
          value={form.carId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded">
          {editing ? "Update" : "Add"}
        </button> */}
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Plan ID</th>
              <th className="py-2 px-4 border">Plan Condition</th>
              <th className="py-2 px-4 border">Car ID</th>
              <th className="py-2 px-4 border">Car Model</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {relations.map(r => (
              <tr key={`${r.planId}-${r.carId}`}>
                <td className="py-2 px-4 border">{r.planId}</td>
                <td className="py-2 px-4 border">{r.planCondition}</td>
                <td className="py-2 px-4 border">{r.carId}</td>
                <td className="py-2 px-4 border">{r.carModel}</td>
                <td className="py-2 px-4 border flex gap-2">
                  {/* <button
                    onClick={() => handleEdit(r)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(r.planId, r.carId)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {relations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No relations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Have;
