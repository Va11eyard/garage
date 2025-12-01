export default function EditRolePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Role</h1>
      <p>Role ID: {params.id}</p>
    </div>
  );
}
