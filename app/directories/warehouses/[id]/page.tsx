export default function WarehouseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Warehouse Details</h1>
      <p>Warehouse ID: {params.id}</p>
    </div>
  );
}
