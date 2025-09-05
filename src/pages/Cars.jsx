import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Car, Palette, Calendar, Settings, Edit, Trash2, Save, X, Plus, Fuel } from "lucide-react";
import api from "../api/api.js";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ color: "", model: "", engineType: "", productYear: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    try {
      const res = await api.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/cars", { 
        ...form, 
        productYear: form.productYear ? parseInt(form.productYear) : null 
      });
      setForm({ color: "", model: "", engineType: "", productYear: "" });
      setIsFormOpen(false);
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = car => {
    setEditingId(car.id);
    setEditForm({ ...car });
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdate = async id => {
    try {
      await api.put(`/cars/${id}`, { 
        ...editForm, 
        productYear: editForm.productYear ? parseInt(editForm.productYear) : null 
      });
      setEditingId(null);
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const getCarIcon = (engineType) => {
    if (engineType?.toLowerCase().includes('electric')) return '⚡';
    if (engineType?.toLowerCase().includes('hybrid')) return '🔋';
    if (engineType?.toLowerCase().includes('diesel')) return '⛽';
    return '🚗';
  };

  const getColorBadge = (color) => {
    const colorMap = {
      'red': 'bg-red-100 text-red-800',
      'blue': 'bg-blue-100 text-blue-800',
      'black': 'bg-gray-100 text-gray-800',
      'white': 'bg-gray-100 text-gray-800',
      'silver': 'bg-gray-100 text-gray-800',
      'green': 'bg-green-100 text-green-800',
      'yellow': 'bg-yellow-100 text-yellow-800',
      'orange': 'bg-orange-100 text-orange-800',
    };
    
    const baseColor = color?.toLowerCase().split(' ')[0] || 'gray';
    return colorMap[baseColor] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Cars</h1>
                <p className="text-gray-600">Manage your vehicle inventory</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Add Car</span>
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
                  <p className="text-sm font-medium text-gray-600">Total Cars</p>
                  <p className="text-3xl font-bold text-gray-900">{cars.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Car className="h-6 w-6 text-green-600" />
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
                  <p className="text-sm font-medium text-gray-600">Models</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(cars.map(c => c.model)).size}
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
                  <p className="text-sm font-medium text-gray-600">Colors</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(cars.map(c => c.color)).size}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Palette className="h-6 w-6 text-purple-600" />
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
                  <p className="text-sm font-medium text-gray-600">Avg Year</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {cars.length > 0 ? Math.round(cars.reduce((sum, car) => sum + (car.productYear || 0), 0) / cars.length) : 0}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-orange-600" />
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Car</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Model</label>
                <input
                  name="model"
                  placeholder="Enter car model"
                  value={form.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Color</label>
                <input
                  name="color"
                  placeholder="Enter car color"
                  value={form.color}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Engine Type</label>
                <input
                  name="engineType"
                  placeholder="e.g., Gasoline, Electric"
                  value={form.engineType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Year</label>
                <input
                  name="productYear"
                  type="number"
                  placeholder="2024"
                  value={form.productYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  min="1900"
                  max="2030"
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
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Add Car
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              {editingId === car.id ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Model</label>
                    <input
                      name="model"
                      value={editForm.model}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Color</label>
                    <input
                      name="color"
                      value={editForm.color}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Engine Type</label>
                    <input
                      name="engineType"
                      value={editForm.engineType}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Year</label>
                    <input
                      name="productYear"
                      type="number"
                      value={editForm.productYear}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(car.id)}
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
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                      <span className="text-2xl">{getCarIcon(car.engineType)}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Car ID</p>
                      <p className="text-lg font-bold text-gray-800">#{car.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{car.model}</h3>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getColorBadge(car.color)}`}>
                        <Palette className="h-4 w-4 mr-1" />
                        {car.color}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Fuel className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{car.engineType}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{car.productYear || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-6">
                    <button
                      onClick={() => startEditing(car)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
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

        {cars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No cars found</h3>
            <p className="text-gray-400">Get started by adding your first car to the inventory</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cars;
