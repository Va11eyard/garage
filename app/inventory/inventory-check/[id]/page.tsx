export default function InventoryCheckDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Inventory Check Details</h1>
      <p>Check ID: {params.id}</p>
    </div>
  );
}
