export default function UnitDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Unit Details</h1>
      <p>Unit ID: {params.id}</p>
    </div>
  );
}
