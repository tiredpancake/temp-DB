import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, Calendar, AlertTriangle, Edit, Trash2, Save, X, Plus, TrendingUp, Percent } from "lucide-react";
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
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      setIsFormOpen(false);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Loans</h1>
                <p className="text-gray-600">Manage financial loans and payments</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Add Loan</span>
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
                  <p className="text-sm font-medium text-gray-600">Total Loans</p>
                  <p className="text-3xl font-bold text-gray-900">{loans.length}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-xl">
                  <CreditCard className="h-6 w-6 text-amber-600" />
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
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(loans.reduce((sum, loan) => sum + (parseFloat(loan.price) || 0), 0))}
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
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-3xl font-bold text-red-600">
                    {loans.filter(loan => isOverdue(loan.dueDate)).length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
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
                  <p className="text-sm font-medium text-gray-600">Avg Interest</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {loans.length > 0 ? 
                      `${Math.round(loans.reduce((sum, loan) => sum + (parseFloat(loan.interestRate) || 0), 0) / loans.length)}%` 
                      : '0%'
                    }
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Percent className="h-6 w-6 text-blue-600" />
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Loan</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Plan ID</label>
                <input
                  name="planId"
                  type="number"
                  placeholder="Enter plan ID"
                  value={form.planId}
                  onChange={handleChange}
                  disabled={!!editing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Loan ID</label>
                <input
                  name="loansId"
                  type="number"
                  placeholder="Enter loan ID"
                  value={form.loansId}
                  onChange={handleChange}
                  disabled={!!editing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Enter loan amount"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <input
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Payment Penalty</label>
                <input
                  name="paymentPenalty"
                  type="number"
                  step="0.01"
                  placeholder="Enter penalty amount"
                  value={form.paymentPenalty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditing(null);
                    setForm({ planId: "", loansId: "", price: "", dueDate: "", paymentPenalty: "" });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {editing ? "Update Loan" : "Add Loan"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Loans Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loans.map((loan, index) => (
            <motion.div
              key={`${loan.planId}-${loan.loansId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 group ${
                isOverdue(loan.dueDate) 
                  ? 'border-red-200 hover:shadow-red-100' 
                  : 'border-gray-100 hover:shadow-xl'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  isOverdue(loan.dueDate) 
                    ? 'bg-gradient-to-r from-red-500 to-red-600' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-600'
                }`}>
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Loan ID</p>
                  <p className="text-lg font-bold text-gray-800">#{loan.loansId}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Loan Details</h3>
                  <p className="text-sm text-gray-500">Plan #{loan.planId}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Amount</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(loan.price)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Due Date</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      isOverdue(loan.dueDate) ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>

                  {loan.paymentPenalty && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">Penalty</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(loan.paymentPenalty)}
                      </span>
                    </div>
                  )}

                  {loan.interestRate && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">Interest Rate</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {loan.interestRate}%
                      </span>
                    </div>
                  )}

                  {loan.carPrice && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">Car Price</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(loan.carPrice)}
                      </span>
                    </div>
                  )}
                </div>

                {isOverdue(loan.dueDate) && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800">Overdue</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => handleEdit(loan)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(loan.planId, loan.loansId)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {loans.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No loans found</h3>
            <p className="text-gray-400">Get started by adding your first loan</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Loan;
