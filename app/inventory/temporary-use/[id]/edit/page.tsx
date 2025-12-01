export default function EditTemporaryUsePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Temporary Use</h1>
      <p>Use ID: {params.id}</p>
    </div>
  );
}
