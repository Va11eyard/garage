export default function WriteOffDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Write-Off Details</h1>
      <p>Write-Off ID: {params.id}</p>
    </div>
  );
}
