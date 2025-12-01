export default function EditIssuePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Issue</h1>
      <p>Issue ID: {params.id}</p>
    </div>
  );
}
