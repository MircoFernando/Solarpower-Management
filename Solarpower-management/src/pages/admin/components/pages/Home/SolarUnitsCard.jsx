import { useState } from "react";
import { X, Zap, Calendar, Activity, User } from "lucide-react";
import { set } from "date-fns";

const SolarUnitCard = ({ SerialNumber, capacity, InstalledDate, status, UserID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 min-w-[280px] max-w-[320px]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Serial Number</p>
              <p className="text-lg font-bold text-primary-dark">{SerialNumber}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">User ID:</span>
            <span className="text-sm font-semibold text-gray-800">{UserID}</span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          More Info
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-primary p-6 text-white relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-xl">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Solar Unit Details</h2>
                  <p className="text-white/80 text-sm mt-1">Complete information</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Serial Number</p>
                  </div>
                  <p className="text-xl font-bold text-primary-dark ml-12">{SerialNumber}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">User ID</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 ml-12">{UserID}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800 ml-12">{capacity} kW</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Installed Date</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800 ml-12">{InstalledDate}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Status</p>
                </div>
                <div className="ml-12">
                  <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(status)}`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                    {status}
                  </span>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mt-6">
                <h3 className="font-semibold text-primary-dark mb-2">Additional Information</h3>
                <p className="text-sm text-gray-600">
                  This solar unit is currently {status?.toLowerCase()} and has been operational since {InstalledDate}. 
                  The unit has a capacity of {capacity} kW.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {setIsEditing(true)
                                setIsModalOpen(false)}
                }
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsEditing(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-primary p-6 text-white relative">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-xl">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Edit Solar Unit</h2>
                  <p className="text-white/80 text-sm mt-1">Complete information</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Serial Number</p>
                  </div>
                  <p className="text-xl font-bold text-primary-dark ml-12">{SerialNumber}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">User ID</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 ml-12">{UserID}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800 ml-12">{capacity} kW</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Installed Date</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800 ml-12">{InstalledDate}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Status</p>
                </div>
                <div className="ml-12">
                  <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(status)}`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                    {status}
                  </span>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mt-6">
                <h3 className="font-semibold text-primary-dark mb-2">Additional Information</h3>
                <p className="text-sm text-gray-600">
                  This solar unit is currently {status?.toLowerCase()} and has been operational since {InstalledDate}. 
                  The unit has a capacity of {capacity} kW.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {setIsEditing(false)
                                setIsModalOpen(true)}
                }
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button
        
                className="flex-1 bg-red-800 hover:bg-red-500 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
              >
                Delete SolarUnit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolarUnitCard;