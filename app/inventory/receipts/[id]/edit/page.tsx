export default function EditReceiptPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Receipt</h1>
      <p>Receipt ID: {params.id}</p>
    </div>
  );
}
