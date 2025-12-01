export default function ProcessInventoryCheckPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Process Inventory Check</h1>
      <p>Check ID: {params.id}</p>
    </div>
  );
}
