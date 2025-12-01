export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Employee Details</h1>
      <p>Employee ID: {params.id}</p>
    </div>
  );
}
