import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, Percent, TrendingUp, Edit, Trash2, Plus, Calculator } from "lucide-react";
import api from "../api/api.js";

const InstallmentSales = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    planId: "",
    interestRate: "",
    carPrice: "",
    partnershipInterest: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      setIsFormOpen(false);
      fetchSales();
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

  const calculateMonthlyPayment = (carPrice, interestRate, months = 60) => {
    const principal = parseFloat(carPrice) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const numPayments = months;
    
    if (rate === 0) return principal / numPayments;
    
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, numPayments)) / (Math.pow(1 + rate, numPayments) - 1);
    return monthlyPayment;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Installment Sales</h1>
                <p className="text-gray-600">Manage payment plans and financing options</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Add Installment Sale</span>
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Plans</p>
                  <p className="text-3xl font-bold text-gray-900">{sales.length}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <CreditCard className="h-6 w-6 text-emerald-600" />
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
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(sales.reduce((sum, sale) => sum + (parseFloat(sale.carPrice) || 0), 0))}
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
                  <p className="text-sm font-medium text-gray-600">Avg Interest</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {sales.length > 0 ? 
                      `${Math.round(sales.reduce((sum, sale) => sum + (parseFloat(sale.interestRate) || 0), 0) / sales.length)}%` 
                      : '0%'
                    }
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Percent className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Partnership</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {sales.length > 0 ? 
                      `${Math.round(sales.reduce((sum, sale) => sum + (parseFloat(sale.partnershipInterest) || 0), 0) / sales.length)}%` 
                      : '0%'
                    }
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Installment Sale</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Plan ID</label>
                <input
                  type="number"
                  name="planId"
                  placeholder="Enter plan ID"
                  value={formData.planId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  name="interestRate"
                  placeholder="Enter interest rate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Car Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="carPrice"
                  placeholder="Enter car price"
                  value={formData.carPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Partnership Interest (%)</label>
                <input
                  type="number"
                  step="0.01"
                  name="partnershipInterest"
                  placeholder="Enter partnership interest"
                  value={formData.partnershipInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Add Installment Sale
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Sales Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sales.map((sale, index) => (
            <motion.div
              key={sale.planId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Plan ID</p>
                  <p className="text-lg font-bold text-gray-800">#{sale.planId}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Installment Plan</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Car Price</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(sale.carPrice)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Percent className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Interest Rate</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {sale.interestRate}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Partnership Interest</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {sale.partnershipInterest}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calculator className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Est. Monthly (60mo)</span>
                    </div>
                    <span className="text-sm font-medium text-emerald-600 font-bold">
                      {formatCurrency(calculateMonthlyPayment(sale.carPrice, sale.interestRate))}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">Payment Calculator</span>
                  </div>
                  <p className="text-xs text-emerald-600 mt-1">
                    Based on 60-month term
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
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

        {sales.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No installment sales found</h3>
            <p className="text-gray-400">Get started by adding your first installment sale plan</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstallmentSales;
