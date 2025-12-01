export default function NormDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Norm Details</h1>
      <p>Norm ID: {params.id}</p>
    </div>
  );
}
