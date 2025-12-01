export default function NormVersionsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Norm Versions</h1>
      <p>Norm ID: {params.id}</p>
    </div>
  );
}
