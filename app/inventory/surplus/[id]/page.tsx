export default function SurplusDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Surplus Details</h1>
      <p>Surplus ID: {params.id}</p>
    </div>
  );
}
