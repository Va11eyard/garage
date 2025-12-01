export default function ScanInventoryCheckPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Scan Inventory Check</h1>
      <p>Check ID: {params.id}</p>
    </div>
  );
}
