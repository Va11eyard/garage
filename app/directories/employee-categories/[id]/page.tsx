export default function EmployeeCategoryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Employee Category Details</h1>
      <p>Category ID: {params.id}</p>
    </div>
  );
}
