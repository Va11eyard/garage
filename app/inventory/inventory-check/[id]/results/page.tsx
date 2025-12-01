export default function InventoryCheckResultsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Inventory Check Results</h1>
      <p>Check ID: {params.id}</p>
    </div>
  );
}
