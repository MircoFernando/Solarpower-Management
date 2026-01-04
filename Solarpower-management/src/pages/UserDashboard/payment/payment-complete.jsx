import { useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router"; // <--- FIXED IMPORT
import { useGetSessionStatusQuery } from "../../../lib/redux/query";
import { CheckCircle, XCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useUpdateInvoiceStatusMutation } from "../../../lib/redux/query";

export default function PaymentCompletePage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  // 1. Safety check: Redirect if someone accesses this page without a session_id
  useEffect(() => {
    if (!sessionId) {
      navigate("/dashboard/invoices");
    }
  }, [sessionId, navigate]);

  const { data, isLoading, isError } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId,
  });

  const [updateInvoiceStatus] = useUpdateInvoiceStatusMutation();

  // Update Invoice Status in backend
  useEffect(() => {
    if (isSuccess && data?.invoice_id) {
      updateInvoiceStatus({
        id: data.invoice_id,
        body: { paymentStatus: "paid",
          paidAt: new Date().toISOString()
         }
      });
    }
  }, [isSuccess, data, updateInvoiceStatus]);

  // 2. Loading State (Centered & Styled)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Verifying Payment...</h2>
        <p className="text-gray-500">Please do not close this window.</p>
      </div>
    );
  }

  // 3. Error State (API failed or invalid session)
  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
          <p className="text-gray-600 mb-6">
            We couldn't verify the payment status. If money was deducted, please contact support.
          </p>
          <Link 
            to="/dashboard/invoices" 
            className="block w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Return to Invoices
          </Link>
        </div>
      </div>
    );
  }

  // 4. Success / Failure Logic based on Stripe status
  // Stripe usually returns status='complete' or payment_status='paid'
  const isSuccess = data?.status === 'complete' || data?.payment_status === 'paid';

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
        
        {isSuccess ? (
          <>
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Thank you. Your invoice has been paid.</p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Amount Paid</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                ${(data.amount_total / 100).toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-yellow-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Unsuccessful</h1>
            <p className="text-gray-600 mb-6">The payment was cancelled or declined.</p>
          </>
        )}

        <Link 
          to="/dashboard/invoices" 
          className="inline-flex items-center justify-center w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Invoices
        </Link>
      </div>
    </div>
  );
}