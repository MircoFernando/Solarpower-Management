import { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar,
  Download,
  Filter,
  ArrowRight
} from 'lucide-react';
import { useGetInvoicesForUserQuery } from '@/lib/redux/query';
import { Link } from 'react-router'; 

const UserInvoicesPage = () => {
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'PENDING' | 'PAID'
  
  // Fetch data
  const { data: invoices, isLoading, isError } = useGetInvoicesForUserQuery();

  // --- Helper Functions ---
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', { // Sri Lanka format based on context
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // --- Filter Logic ---
  const filteredInvoices = invoices?.filter(invoice => {
    if (statusFilter === 'all') return true;
    return invoice.paymentStatus === statusFilter;
  }) || [];

  // --- Stats Calculation ---
  const totalPending = invoices
    ?.filter(inv => inv.paymentStatus === 'PENDING')
    .reduce((sum, inv) => sum + inv.amount, 0) || 0;

  const totalPaid = invoices
    ?.filter(inv => inv.paymentStatus === 'PAID')
    .reduce((sum, inv) => sum + inv.amount, 0) || 0;

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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to load invoices. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen space-y-8">
      
      {/* 1. Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Invoices</h1>
        <p className="text-gray-600 mt-1">Manage your billing and view payment history</p>
      </div>

      {/* 2. Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Balance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Outstanding Balance</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalPending)}</h3>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Clock className="w-6 h-6 text-yellow-700" />
          </div>
        </div>

        {/* Total Paid */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Paid (Lifetime)</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaid)}</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-700" />
          </div>
        </div>

        {/* Total Invoices */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Invoices</p>
            <h3 className="text-2xl font-bold text-gray-900">{invoices?.length || 0}</h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <FileText className="w-6 h-6 text-blue-700" />
          </div>
        </div>
      </div>

      {/* 3. Main Content: Filters & Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg self-start">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'all' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'PENDING' 
                  ? 'bg-white text-yellow-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('PAID')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'PAID' 
                  ? 'bg-white text-green-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Paid
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Filter className="w-4 h-4" />
            <span>Showing {filteredInvoices.length} invoices</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Billing Period</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Generated</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Usage</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Amount</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                    {/* Billing Period */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(invoice.billingPeriodStart)}
                          </p>
                          <p className="text-xs text-gray-500">
                            to {formatDate(invoice.billingPeriodEnd)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Generated Date (Invoice Creation Date) */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </td>

                    {/* Usage */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-900">{invoice.totalEnergyGenerated.toFixed(2)}</span>
                        <span className="text-gray-500 text-xs">kWh</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        invoice.paymentStatus === 'PAID'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : invoice.paymentStatus === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {invoice.paymentStatus === 'PAID' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {invoice.paymentStatus === 'PENDING' && <Clock className="w-3 h-3 mr-1" />}
                        {invoice.paymentStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      {invoice.paymentStatus === 'PENDING' ? (
                        <Link 
                          to={`/payment/${invoice._id}`} 
                          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                        >
                          Pay Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      ) : (
                         <button className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                           <Download className="w-4 h-4 mr-2" />
                           Receipt
                         </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-3">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="font-medium text-gray-900">No invoices found</p>
                      <p className="text-sm">No {statusFilter === 'all' ? '' : statusFilter.toLowerCase()} invoices to display.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserInvoicesPage;