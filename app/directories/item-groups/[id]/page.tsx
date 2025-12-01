export default function ItemGroupDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Item Group Details</h1>
      <p>Group ID: {params.id}</p>
    </div>
  );
}
