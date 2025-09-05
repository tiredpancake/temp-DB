import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Zap, Edit, Trash2, Plus, TrendingUp, Calculator } from "lucide-react";
import api from "../api/api.js";

const SpotSales = () => {
  const [spotSales, setSpotSales] = useState([]);
  const [form, setForm] = useState({ planId: "", spotPrice: "" });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      setIsFormOpen(false);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Spot Sales</h1>
                <p className="text-gray-600">Manage immediate cash sales</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Add Spot Sale</span>
            </motion.button>
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
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-3xl font-bold text-gray-900">{spotSales.length}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Zap className="h-6 w-6 text-yellow-600" />
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
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(spotSales.reduce((sum, sale) => sum + (parseFloat(sale.spotPrice) || 0), 0))}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-green-600" />
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
                  <p className="text-sm font-medium text-gray-600">Avg Price</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {spotSales.length > 0 ? 
                      formatCurrency(spotSales.reduce((sum, sale) => sum + (parseFloat(sale.spotPrice) || 0), 0) / spotSales.length)
                      : '$0'
                    }
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Add Form */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isFormOpen ? 1 : 0, 
            height: isFormOpen ? "auto" : 0 
          }}
          className="mb-8 overflow-hidden"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Spot Sale</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Plan ID</label>
        <input
          name="planId"
                  type="number"
                  placeholder="Enter plan ID"
          value={form.planId}
          onChange={handleChange}
                  disabled={editingId !== null}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
                  required
        />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Spot Price</label>
        <input
          name="spotPrice"
                  type="number"
                  step="0.01"
                  placeholder="Enter spot price"
          value={form.spotPrice}
          onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="md:col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingId(null);
                    setForm({ planId: "", spotPrice: "" });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {editingId ? "Update Spot Sale" : "Add Spot Sale"}
        </button>
              </div>
      </form>
          </div>
        </motion.div>

        {/* Sales Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {spotSales.map((sale, index) => (
            <motion.div
              key={sale.planId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Plan ID</p>
                  <p className="text-lg font-bold text-gray-800">#{sale.planId}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Spot Sale</h3>
                  <p className="text-sm text-gray-500">Immediate cash purchase</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Price</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(sale.spotPrice)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Cash Sale</span>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">
                    Immediate payment required
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                  <button
                    onClick={() => handleEdit(sale)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                  >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(sale.planId)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                  </button>
              </div>
            </motion.div>
            ))}
        </motion.div>

            {spotSales.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No spot sales found</h3>
            <p className="text-gray-400">Get started by adding your first spot sale</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SpotSales;
