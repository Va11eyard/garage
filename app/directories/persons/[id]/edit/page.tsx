export default function EditPersonPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Person</h1>
      <p>Person ID: {params.id}</p>
    </div>
  );
}
