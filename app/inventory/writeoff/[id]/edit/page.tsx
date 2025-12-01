export default function EditWriteOffPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Write-Off</h1>
      <p>Write-Off ID: {params.id}</p>
    </div>
  );
}
