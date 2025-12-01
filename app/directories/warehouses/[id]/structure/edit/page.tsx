export default function EditWarehouseStructurePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Warehouse Structure</h1>
      <p>Warehouse ID: {params.id}</p>
    </div>
  );
}
