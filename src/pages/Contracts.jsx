import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Car, User, Building, Calendar, Edit, Trash2, Save, X, Plus, AlertCircle, CheckCircle } from "lucide-react";
import api from "../api/api.js";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [form, setForm] = useState({
    cancelationCondition: "",
    deliveryCondition: "",
    carId: "",
    customerId: "",
    companyId: "",
    planId: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => { fetchContracts(); }, []);

  const fetchContracts = async () => {
    try {
      const res = await api.get("/contracts");
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/contracts", {
        ...form,
        carId: parseInt(form.carId),
        customerId: parseInt(form.customerId),
        companyId: parseInt(form.companyId),
        planId: parseInt(form.planId)
      });
      setForm({ cancelationCondition: "", deliveryCondition: "", carId: "", customerId: "", companyId: "", planId: "" });
      setIsFormOpen(false);
      fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = contract => {
    setEditingId(contract.id);
    setEditForm({
      cancelationCondition: contract.cancelationCondition,
      deliveryCondition: contract.deliveryCondition,
      carId: contract.carId,
      customerId: contract.customerId,
      companyId: contract.companyId,
      planId: contract.planId
    });
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdate = async id => {
    try {
      await api.put(`/contracts/${id}`, {
        ...editForm,
        carId: parseInt(editForm.carId),
        customerId: parseInt(editForm.customerId),
        companyId: parseInt(editForm.companyId),
        planId: parseInt(editForm.planId)
      });
      setEditingId(null);
      fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/contracts/${id}`);
      fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Contracts</h1>
                <p className="text-gray-600">Manage legal agreements and contracts</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Add Contract</span>
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
                  <p className="text-sm font-medium text-gray-600">Total Contracts</p>
                  <p className="text-3xl font-bold text-gray-900">{contracts.length}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <FileText className="h-6 w-6 text-indigo-600" />
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
                  <p className="text-sm font-medium text-gray-600">Active Cars</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(contracts.map(c => c.carId)).size}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Car className="h-6 w-6 text-green-600" />
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
                  <p className="text-sm font-medium text-gray-600">Customers</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(contracts.map(c => c.customerId)).size}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <User className="h-6 w-6 text-blue-600" />
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
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(contracts.map(c => c.companyId)).size}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Building className="h-6 w-6 text-purple-600" />
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Contract</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Car ID</label>
                <input
                  name="carId"
                  type="number"
                  placeholder="Enter car ID"
                  value={form.carId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Customer ID</label>
                <input
                  name="customerId"
                  type="number"
                  placeholder="Enter customer ID"
                  value={form.customerId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company ID</label>
                <input
                  name="companyId"
                  type="number"
                  placeholder="Enter company ID"
                  value={form.companyId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Plan ID</label>
                <input
                  name="planId"
                  type="number"
                  placeholder="Enter plan ID"
                  value={form.planId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Cancelation Condition</label>
                <input
                  name="cancelationCondition"
                  placeholder="Enter cancelation condition"
                  value={form.cancelationCondition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Delivery Condition</label>
                <input
                  name="deliveryCondition"
                  placeholder="Enter delivery condition"
                  value={form.deliveryCondition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Add Contract
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Contracts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contracts.map((contract, index) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              {editingId === contract.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Car ID</label>
                      <input
                        name="carId"
                        type="number"
                        value={editForm.carId}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Customer ID</label>
                      <input
                        name="customerId"
                        type="number"
                        value={editForm.customerId}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cancelation Condition</label>
                    <input
                      name="cancelationCondition"
                      value={editForm.cancelationCondition}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Delivery Condition</label>
                    <input
                      name="deliveryCondition"
                      value={editForm.deliveryCondition}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(contract.id)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Contract ID</p>
                      <p className="text-lg font-bold text-gray-800">#{contract.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Contract Details</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Car className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{contract.carModel || `Car #${contract.carId}`}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{contract.customerName || `Customer #${contract.customerId}`}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{contract.companyName || `Company #${contract.companyId}`}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">Plan #{contract.planId}</span>
                      </div>
                    </div>

                    {contract.cancelationCondition && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Cancelation</p>
                            <p className="text-sm text-red-600">{contract.cancelationCondition}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {contract.deliveryCondition && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-800">Delivery</p>
                            <p className="text-sm text-green-600">{contract.deliveryCondition}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 mt-6">
                    <button
                      onClick={() => startEditing(contract)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(contract.id)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {contracts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No contracts found</h3>
            <p className="text-gray-400">Get started by adding your first contract</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Contracts;
