import { useEffect, useState } from "react";
import api from "../api/api.js";

const Participates = () => {
  const [participates, setParticipates] = useState([]);

  useEffect(() => {
    fetchParticipates();
  }, []);

  const fetchParticipates = async () => {
    try {
      const res = await api.get("/participates");
      setParticipates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (customerId, planId) => {
    try {
      await api.delete(`/participates/${customerId}/${planId}`);
      fetchParticipates();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Participates</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Plan ID</th>
              <th className="py-2 px-4 border">Company</th>
              <th className="py-2 px-4 border">Capacity</th>
              <th className="py-2 px-4 border">Condition</th>
              <th className="py-2 px-4 border">Deadline</th>
              <th className="py-2 px-4 border">Cancelation</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participates.map((p, i) => (
              <tr key={`${p.customerId}-${p.planId}-${i}`}>
                <td className="py-2 px-4 border">{p.customerName}</td>
                <td className="py-2 px-4 border">{p.planId}</td>
                <td className="py-2 px-4 border">{p.companyName}</td>
                <td className="py-2 px-4 border">{p.capacity}</td>
                <td className="py-2 px-4 border">{p.registrationCondition}</td>
                <td className="py-2 px-4 border">
                  {p.registrationDeadline
                    ? new Date(p.registrationDeadline).toLocaleDateString()
                    : ""}
                </td>
                <td className="py-2 px-4 border">{p.cancelationBenefit}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(p.customerId, p.planId)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Participates;
