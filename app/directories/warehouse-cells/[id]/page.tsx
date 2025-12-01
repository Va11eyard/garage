export default function WarehouseCellDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Warehouse Cell Details</h1>
      <p>Cell ID: {params.id}</p>
    </div>
  );
}
