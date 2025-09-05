import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, Car, Settings, Trash2, AlertCircle, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                <Link className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Plan-Car Relations</h1>
                <p className="text-gray-600">Manage relationships between plans and cars</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Relations</p>
                  <p className="text-3xl font-bold text-gray-900">{relations.length}</p>
                </div>
                <div className="p-3 bg-cyan-100 rounded-xl">
                  <Link className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unique Plans</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(relations.map(r => r.planId)).size}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unique Cars</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(relations.map(r => r.carId)).size}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Relations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {relations.map((relation, index) => (
            <motion.div
              key={`${relation.planId}-${relation.carId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                  <Link className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Relation</p>
                  <p className="text-lg font-bold text-gray-800">#{index + 1}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Plan-Car Link</h3>
                  <p className="text-sm text-gray-500">Connected relationship</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Plan ID</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      #{relation.planId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Car ID</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      #{relation.carId}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Plan Condition</p>
                      <p className="text-sm font-medium text-gray-800">{relation.planCondition}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Car Model</p>
                      <p className="text-sm font-medium text-gray-800">{relation.carModel}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => handleDelete(relation.planId, relation.carId)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {relations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Link className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No relations found</h3>
            <p className="text-gray-400">Relations will appear here when created</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Have;
