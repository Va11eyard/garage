export default function EditUnitPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Unit</h1>
      <p>Unit ID: {params.id}</p>
    </div>
  );
}
