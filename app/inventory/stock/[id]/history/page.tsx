export default function StockHistoryPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Stock History</h1>
      <p>Stock ID: {params.id}</p>
    </div>
  );
}
