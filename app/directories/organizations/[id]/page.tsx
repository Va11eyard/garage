export default function OrganizationDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Organization Details</h1>
      <p>Organization ID: {params.id}</p>
    </div>
  );
}
