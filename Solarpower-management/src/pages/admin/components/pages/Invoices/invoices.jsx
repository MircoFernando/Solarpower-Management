import { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Download,
  User,
  DollarSign
} from 'lucide-react';
import { useGetAllInvoicesQuery } from '@/lib/redux/query'; // Admin query hook

const AdminInvoicesPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use the admin query to fetch ALL invoices
  const { data, isLoading, isError } = useGetAllInvoicesQuery();
  
  // Handle data structure (Array vs Object wrapper)
  const invoices = Array.isArray(data) ? data : (data?.data || []);

  // --- Helpers ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // --- Filtering Logic ---
  const filteredInvoices = invoices.filter(invoice => {
    // 1. Status Filter
    if (statusFilter !== 'all' && invoice.paymentStatus !== statusFilter) return false;
    
    // 2. Search Filter (Invoice ID, Username, or Amount)
    const query = searchQuery.toLowerCase();
    const invoiceId = invoice._id.toLowerCase();
    const userName = (invoice.userName || '').toLowerCase();
    const amountStr = invoice.amount.toString();
    
    return invoiceId.includes(query) || userName.includes(query) || amountStr.includes(query);
  });

  // --- Admin Stats ---
  const totalRevenue = invoices
    .filter(inv => inv.paymentStatus === 'PAID')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter(inv => inv.paymentStatus === 'PENDING')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdueCount = invoices
    .filter(inv => inv.paymentStatus === 'PENDING' && new Date(inv.dueDate) < new Date())
    .length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error loading invoices. Please check your admin permissions.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-dark">Financial Overview</h1>
        <p className="text-gray-600 mt-1">Monitor billing and revenue across all users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue Collected</h3>
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Pending Payments</h3>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
          <p className="text-sm text-gray-500 mt-1">{filteredInvoices.filter(i => i.paymentStatus === 'PENDING').length} invoices pending</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-red-600">Overdue / Critical</h3>
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-700">{overdueCount}</p>
          <p className="text-sm text-red-500 mt-1">Invoices past due date</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Filters Toolbar */}
        <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by User, ID, or Amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
             <button
               onClick={() => setStatusFilter('all')}
               className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                 statusFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
               }`}
             >
               All Invoices
             </button>
             <button
               onClick={() => setStatusFilter('PENDING')}
               className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                 statusFilter === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
               }`}
             >
               Pending
             </button>
             <button
               onClick={() => setStatusFilter('PAID')}
               className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                 statusFilter === 'PAID' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'
               }`}
             >
               Paid
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Invoice Details</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Generated Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                    {/* Invoice ID + Period */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg">
                           <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-mono text-xs text-gray-500 mb-1">#{invoice._id.slice(-6).toUpperCase()}</p>
                          <p className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded inline-block">
                             {formatDate(invoice.billingPeriodStart)} - {formatDate(invoice.billingPeriodEnd)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{invoice.userName}</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-6 truncate max-w-[150px]">{invoice.solarUnitId}</p>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                      <p className="text-xs text-gray-500">{invoice.totalEnergyGenerated.toFixed(1)} kWh</p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatDate(invoice.createdAt)}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        invoice.paymentStatus === 'PAID'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : invoice.paymentStatus === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {invoice.paymentStatus === 'PAID' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {invoice.paymentStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="View Details"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Filter className="w-8 h-8 text-gray-300 mb-3" />
                      <p>No invoices found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Pagination Placeholder */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
           <span>Showing {filteredInvoices.length} of {invoices.length} records</span>
           {/* Add pagination controls here if needed */}
        </div>
      </div>
    </div>
  );
};

export default AdminInvoicesPage;