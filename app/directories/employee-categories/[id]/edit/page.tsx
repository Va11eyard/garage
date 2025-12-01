export default function EditEmployeeCategoryPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Employee Category</h1>
      <p>Category ID: {params.id}</p>
    </div>
  );
}
