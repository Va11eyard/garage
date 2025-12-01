export default function WarehouseStructurePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Warehouse Structure</h1>
      <p>Warehouse ID: {params.id}</p>
    </div>
  );
}
