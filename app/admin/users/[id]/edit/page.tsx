export default function EditUserPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit User</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
}
