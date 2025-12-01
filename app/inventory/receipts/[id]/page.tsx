export default function ReceiptDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Receipt Details</h1>
      <p>Receipt ID: {params.id}</p>
    </div>
  );
}
