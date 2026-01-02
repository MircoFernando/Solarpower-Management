import { useSearchParams, Link } from "react-router";
import { useGetSessionStatusQuery } from "../../../lib/redux/query";

export default function PaymentCompletePage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId,
  });

  if (isLoading) return <div>Verifying payment...</div>;

  const isSuccess = data?.paymentStatus === "paid";

  return (
    <div>
      {isSuccess ? (
        <>
          <h1>Payment Successful!</h1>
          <p>Amount: ${(data.amountTotal / 100).toFixed(2)}</p>
        </>
      ) : (
        <h1>Payment Failed</h1>
      )}
      <Link to="/dashboard/invoices">Back to Invoices</Link>
    </div>
  );
}
