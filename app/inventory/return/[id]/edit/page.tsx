export default function EditReturnPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Return</h1>
      <p>Return ID: {params.id}</p>
    </div>
  );
}
