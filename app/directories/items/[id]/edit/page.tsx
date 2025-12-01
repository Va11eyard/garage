export default function EditItemPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Item</h1>
      <p>Item ID: {params.id}</p>
    </div>
  );
}
