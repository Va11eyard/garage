export default function NormVersionDetailPage({ 
  params 
}: { 
  params: { id: string; versionId: string } 
}) {
  return (
    <div>
      <h1>Norm Version Details</h1>
      <p>Norm ID: {params.id}</p>
      <p>Version ID: {params.versionId}</p>
    </div>
  );
}
