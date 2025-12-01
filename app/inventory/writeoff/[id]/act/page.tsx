export default function WriteOffActPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Write-Off Act</h1>
      <p>Write-Off ID: {params.id}</p>
    </div>
  );
}
