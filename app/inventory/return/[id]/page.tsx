export default function ReturnDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Return Details</h1>
      <p>Return ID: {params.id}</p>
    </div>
  );
}
