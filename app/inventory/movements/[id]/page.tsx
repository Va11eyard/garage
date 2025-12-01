export default function MovementDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Movement Details</h1>
      <p>Movement ID: {params.id}</p>
    </div>
  );
}
