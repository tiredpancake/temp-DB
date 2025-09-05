import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, User, Building, Calendar, AlertCircle, Trash2, CheckCircle, Clock } from "lucide-react";
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Participations</h1>
                <p className="text-gray-600">Manage customer plan participations</p>
              </div>
            </div>
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
                  <p className="text-sm font-medium text-gray-600">Total Participations</p>
                  <p className="text-3xl font-bold text-gray-900">{participates.length}</p>
                </div>
                <div className="p-3 bg-violet-100 rounded-xl">
                  <Users className="h-6 w-6 text-violet-600" />
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
                  <p className="text-sm font-medium text-gray-600">Unique Customers</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(participates.map(p => p.customerId)).size}
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
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(participates.map(p => p.companyName)).size}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Building className="h-6 w-6 text-green-600" />
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
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-3xl font-bold text-red-600">
                    {participates.filter(p => isDeadlinePassed(p.registrationDeadline)).length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Participations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {participates.map((participation, index) => (
            <motion.div
              key={`${participation.customerId}-${participation.planId}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Participation</p>
                  <p className="text-lg font-bold text-gray-800">#{index + 1}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{participation.customerName}</h3>
                  <p className="text-sm text-gray-500">Customer Participation</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Company</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {participation.companyName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Plan ID</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      #{participation.planId}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Capacity</span>
                      <span className="text-xs font-medium text-gray-800">{participation.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Condition</span>
                      <span className="text-xs font-medium text-gray-800">{participation.registrationCondition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Cancelation</span>
                      <span className="text-xs font-medium text-gray-800">{participation.cancelationBenefit}</span>
                    </div>
                  </div>
                </div>

                {participation.registrationDeadline && (
                  <div className={`mt-4 p-3 rounded-lg border ${
                    isDeadlinePassed(participation.registrationDeadline) 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {isDeadlinePassed(participation.registrationDeadline) ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        isDeadlinePassed(participation.registrationDeadline) 
                          ? 'text-red-800' 
                          : 'text-green-800'
                      }`}>
                        Deadline: {formatDate(participation.registrationDeadline)}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${
                      isDeadlinePassed(participation.registrationDeadline) 
                        ? 'text-red-600' 
                        : 'text-green-600'
                    }`}>
                      {isDeadlinePassed(participation.registrationDeadline) 
                        ? 'Deadline has passed' 
                        : 'Active participation'
                      }
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => handleDelete(participation.customerId, participation.planId)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {participates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No participations found</h3>
            <p className="text-gray-400">Participations will appear here when created</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Participates;
