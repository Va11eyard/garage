export default function ItemDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Item Details</h1>
      <p>Item ID: {params.id}</p>
    </div>
  );
}
