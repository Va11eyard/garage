export default function IssueDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Issue Details</h1>
      <p>Issue ID: {params.id}</p>
    </div>
  );
}
