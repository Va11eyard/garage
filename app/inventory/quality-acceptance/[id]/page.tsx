export default function QualityAcceptanceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Quality Acceptance Details</h1>
      <p>Acceptance ID: {params.id}</p>
    </div>
  );
}
