export default function RoleDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Role Details</h1>
      <p>Role ID: {params.id}</p>
    </div>
  );
}
