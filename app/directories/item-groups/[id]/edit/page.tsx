export default function EditItemGroupPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Item Group</h1>
      <p>Group ID: {params.id}</p>
    </div>
  );
}
