import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Calendar, 
  Zap, 
  FileText, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { useGetInvoiceByIdQuery } from '../../../lib/redux/query';
import CheckoutForm from '../../../components/checkoutForm';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Invoice Details
  const { data: invoice, isLoading, isError } = useGetInvoiceByIdQuery(id);

  // --- Formatters ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invoice Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't locate the invoice details. It may have been deleted or expired.</p>
          <button 
            onClick={() => navigate('/dashboard/invoices')}
            className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Return to Invoices
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Navigation Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Column: Invoice Summary */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complete Payment</h1>
            <p className="text-gray-600 mt-2">Securely pay your energy bill online.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-primary/5 p-6 border-b border-gray-100">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Total Due</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold text-gray-900">{formatCurrency(invoice.amount)}</span>
                <span className="ml-2 text-gray-500">USD</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Billing Period */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-2.5 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Billing Period</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(invoice.billingPeriodStart)} - {formatDate(invoice.billingPeriodEnd)}
                  </p>
                </div>
              </div>

              {/* Energy Usage */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-2.5 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Usage</p>
                  <p className="text-sm text-gray-600">{invoice.totalEnergyGenerated.toFixed(2)} kWh</p>
                </div>
              </div>

              {/* Invoice ID */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-2.5 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Invoice ID</p>
                  <p className="text-sm text-gray-600 font-mono">{invoice._id}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>SSL Secured Payment</span>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                alt="Powered by Stripe" 
                className="h-6 opacity-70"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Payment Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8 min-h-[600px]">
           <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
           
           <CheckoutForm invoiceId ={id} />
           
           <p className="text-center text-xs text-gray-400 mt-6">
             By clicking "Pay Now", you agree to our Terms of Service.
           </p>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;