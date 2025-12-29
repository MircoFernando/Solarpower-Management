// src/pages/dashboard/admin/AdminAnomaliesPage.jsx
import { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Clock, 
  Filter,
  TrendingUp,
  X,
  Search,
  FileText,
  Server // Added icon for Solar Unit/Server
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useGetAllAnomaliesQuery } from '@/lib/redux/query'; // Admin query hook

const AdminAnomaliesPage = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  
  // Admin filters now include Serial Number search
  const [filters, setFilters] = useState({
    anomalyType: 'all',
    severity: 'all',
    status: 'all',
  });
  const [searchSerial, setSearchSerial] = useState('');
  
  // Fetching with groupBy='date' to match your aggregation payload
  const { data, isLoading, isError } = useGetAllAnomaliesQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error loading system anomalies
        </div>
      </div>
    );
  }

  const anomalies = data || [];


  const filteredAnomalies = anomalies.filter((anomaly) => {
    if (filters.anomalyType !== 'all' && anomaly.anomalyType !== filters.anomalyType) return false;
    if (filters.severity !== 'all' && anomaly.severity !== filters.severity) return false;
    if (filters.status !== 'all' && anomaly.status !== filters.status) return false;
    
    // Serial Number Filter
    if (searchSerial && !anomaly.serialNumber.toLowerCase().includes(searchSerial.toLowerCase())) return false;
    
    return true;
  });

  // Get severity config
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          color: 'text-red-700',
          bg: 'bg-red-100',
          border: 'border-red-300',
          icon: AlertTriangle,
        };
      case 'WARNING':
        return {
          color: 'text-yellow-700',
          bg: 'bg-yellow-100',
          border: 'border-yellow-300',
          icon: AlertCircle,
        };
      case 'INFO':
        return {
          color: 'text-blue-700',
          bg: 'bg-blue-100',
          border: 'border-blue-300',
          icon: Info,
        };
      default:
        return {
          color: 'text-gray-700',
          bg: 'bg-gray-100',
          border: 'border-gray-300',
          icon: Info,
        };
    }
  };

  const getAnomalyTypeLabel = (type) => {
    const labels = {
      ZERO_GENERATION: 'Zero Generation',
      GENERATION_DROP: 'Generation Drop',
      ABNORMAL_PEAK: 'Abnormal Peak',
      NIGHT_GENERATION: 'Night Generation',
    };
    return labels[type] || type;
  };

  // --- Chart Preparation (Aggregated for Admin View) ---

  // Anomalies by type
  const anomalyTypeData = anomalies.reduce((acc, anomaly) => {
    const type = getAnomalyTypeLabel(anomaly.anomalyType);
    const existing = acc.find((item) => item.name === type);
    if (existing) {
      existing.count += anomaly.occurrences;
    } else {
      acc.push({ name: type, count: anomaly.occurrences });
    }
    return acc;
  }, []);

  // Anomalies over time
  const timelineData = anomalies.reduce((acc, anomaly) => {
    const date = anomaly.date;
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing[anomaly.severity] = (existing[anomaly.severity] || 0) + anomaly.occurrences;
    } else {
      acc.push({
        date,
        CRITICAL: anomaly.severity === 'CRITICAL' ? anomaly.occurrences : 0,
        WARNING: anomaly.severity === 'WARNING' ? anomaly.occurrences : 0,
        INFO: anomaly.severity === 'INFO' ? anomaly.occurrences : 0,
      });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Severity distribution
  const severityData = [
    { name: 'Critical', value: anomalies.filter((a) => a.severity === 'CRITICAL').reduce((sum, a) => sum + a.occurrences, 0), color: '#dc2626' },
    { name: 'Warning', value: anomalies.filter((a) => a.severity === 'WARNING').reduce((sum, a) => sum + a.occurrences, 0), color: '#ca8a04' },
    { name: 'Info', value: anomalies.filter((a) => a.severity === 'INFO').reduce((sum, a) => sum + a.occurrences, 0), color: '#2563eb' },
  ];

  // Stats
  const totalAnomalies = anomalies.reduce((sum, a) => sum + a.occurrences, 0);
  const criticalCount = anomalies.filter((a) => a.severity === 'CRITICAL').reduce((sum, a) => sum + a.occurrences, 0);
  const warningCount = anomalies.filter((a) => a.severity === 'WARNING').reduce((sum, a) => sum + a.occurrences, 0);
  const openCount = anomalies.filter((a) => a.status === 'OPEN').reduce((sum, a) => sum + a.occurrences, 0);

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-2">System Anomalies</h1>
        <p className="text-gray-600">Global overview of all solar unit anomalies across the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">System Total</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{totalAnomalies}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-full">
              <TrendingUp className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl shadow-md border border-red-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 text-sm font-medium">Critical Issues</p>
              <p className="text-3xl font-bold text-red-700 mt-1">{criticalCount}</p>
            </div>
            <div className="bg-red-200 p-4 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-700" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl shadow-md border border-yellow-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 text-sm font-medium">System Warnings</p>
              <p className="text-3xl font-bold text-yellow-700 mt-1">{warningCount}</p>
            </div>
            <div className="bg-yellow-200 p-4 rounded-full">
              <AlertCircle className="w-8 h-8 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl shadow-md border border-blue-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 text-sm font-medium">Unresolved</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">{openCount}</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-full">
              <Clock className="w-8 h-8 text-blue-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Anomalies by Type</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={anomalyTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#018790" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Severity Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Global Anomaly Timeline</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
              <Legend />
              <Line type="monotone" dataKey="CRITICAL" stroke="#dc2626" strokeWidth={2} name="Critical" />
              <Line type="monotone" dataKey="WARNING" stroke="#ca8a04" strokeWidth={2} name="Warning" />
              <Line type="monotone" dataKey="INFO" stroke="#2563eb" strokeWidth={2} name="Info" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Serial Number Filter */}
           <div className="relative">
             <label className="block text-sm font-medium text-gray-700 mb-2">Search Serial Number</label>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="SN..."
                    value={searchSerial}
                    onChange={(e) => setSearchSerial(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
             </div>
           </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Anomaly Type</label>
            <select
              value={filters.anomalyType}
              onChange={(e) => setFilters({ ...filters, anomalyType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="ZERO_GENERATION">Zero Generation</option>
              <option value="GENERATION_DROP">Generation Drop</option>
              <option value="ABNORMAL_PEAK">Abnormal Peak</option>
              <option value="NIGHT_GENERATION">Night Generation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={filters.severity}
              onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="WARNING">Warning</option>
              <option value="INFO">Info</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="ACKNOWLEDGED">Acknowledged</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Anomalies List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Detected Anomalies</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredAnomalies.length} of {anomalies.length} total anomalies
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAnomalies.length > 0 ? (
            filteredAnomalies.map((anomaly, index) => {
              const config = getSeverityConfig(anomaly.severity);
              const Icon = config.icon;

              return (
                <div
                  key={`${anomaly.date}-${anomaly.serialNumber}-${index}`} // Composite key as ID might not be in aggregation
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${config.border}`}
                  onClick={() => setSelectedAnomaly(anomaly)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${config.bg} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${config.color}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                           {/* Added Serial Number Badge for Admin */}
                          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-600 border border-gray-200">
                            <Server className="w-3 h-3" />
                            {anomaly.serialNumber}
                          </div>

                          <h3 className="text-lg font-semibold text-gray-800">
                            {getAnomalyTypeLabel(anomaly.anomalyType)}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                            {anomaly.severity}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                            {anomaly.status}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-3">{anomaly.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <p className="font-medium text-gray-800">
                              {new Date(anomaly.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Period:</span>
                            <p className="font-medium text-gray-800">
                              {new Date(anomaly.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(anomaly.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Occurrences:</span>
                            <p className="font-medium text-gray-800">{anomaly.occurrences}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <p className="font-medium text-gray-800">{anomaly.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-gray-500">
              <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No anomalies found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAnomaly && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAnomaly(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const config = getSeverityConfig(selectedAnomaly.severity);
              const Icon = config.icon;

              return (
                <>
                  <div className={`p-6 border-b ${config.bg} ${config.border} border-b-2`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`${config.bg} p-4 rounded-xl border-2 ${config.border}`}>
                          <Icon className={`w-8 h-8 ${config.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <div className="flex items-center gap-1 bg-white/50 px-2 py-0.5 rounded text-xs font-mono text-gray-700 border border-gray-200/50">
                                <Server className="w-3 h-3" />
                                {selectedAnomaly.serialNumber}
                             </div>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800">
                            {getAnomalyTypeLabel(selectedAnomaly.anomalyType)}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                              {selectedAnomaly.severity}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                              {selectedAnomaly.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAnomaly(null)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <X className="w-6 h-6 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                      <p className="text-gray-600">{selectedAnomaly.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Solar Unit S/N</p>
                        <p className="font-semibold text-primary font-mono">{selectedAnomaly.serialNumber}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Detected Date</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(selectedAnomaly.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Time Period</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(selectedAnomaly.startTime).toLocaleTimeString()} - 
                          {new Date(selectedAnomaly.endTime).toLocaleTimeString()}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Occurrences</p>
                        <p className="font-semibold text-gray-800">{selectedAnomaly.occurrences} times</p>
                      </div>
                    </div>

                    <div className={`${config.bg} border ${config.border} rounded-lg p-4`}>
                      <h4 className={`font-semibold ${config.color} mb-2`}>Technical Insight:</h4>
                      <p className="text-sm text-gray-700">
                        {selectedAnomaly.anomalyType === 'ZERO_GENERATION' && 
                          "Unit reported 0kWh during active hours. Potential inverter failure or complete connectivity loss."}
                        {selectedAnomaly.anomalyType === 'GENERATION_DROP' && 
                          "Significant deviation from expected output curve. Check for localized shading, panel degradation, or dirt accumulation."}
                        {selectedAnomaly.anomalyType === 'ABNORMAL_PEAK' && 
                          "Output spiked above rated capacity. Inspect sensor calibration or check for grid voltage surges."}
                        {selectedAnomaly.anomalyType === 'NIGHT_GENERATION' && 
                          "Sensor activity detected during dark hours. Likely measurement noise or timestamp synchronization error."}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex gap-3 justify-end">
                    <button
                      onClick={() => setSelectedAnomaly(null)}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Close
                    </button>
                    {/* Admin actions could go here (e.g., Contact User, Initiate Maintenance) */}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnomaliesPage;