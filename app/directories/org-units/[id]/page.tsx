export default function OrgUnitDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Org Unit Details</h1>
      <p>Unit ID: {params.id}</p>
    </div>
  );
}
