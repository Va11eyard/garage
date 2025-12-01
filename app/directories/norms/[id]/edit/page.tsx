export default function EditNormPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Norm</h1>
      <p>Norm ID: {params.id}</p>
    </div>
  );
}
