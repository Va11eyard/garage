export default function StockDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Stock Details</h1>
      <p>Stock ID: {params.id}</p>
    </div>
  );
}
