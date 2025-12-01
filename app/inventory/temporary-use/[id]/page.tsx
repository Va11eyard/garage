export default function TemporaryUseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Temporary Use Details</h1>
      <p>Use ID: {params.id}</p>
    </div>
  );
}
