export default function ResponsiblePersonDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Responsible Person Details</h1>
      <p>Person ID: {params.id}</p>
    </div>
  );
}
