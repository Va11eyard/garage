export default function EditMovementPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Movement</h1>
      <p>Movement ID: {params.id}</p>
    </div>
  );
}
