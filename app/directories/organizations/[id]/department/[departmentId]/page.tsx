export default function DepartmentDetailPage({ params }: { params: { id: string; departmentId: string } }) {
  return (
    <div>
      <h1>Department Details</h1>
      <p>Organization ID: {params.id}</p>
      <p>Department ID: {params.departmentId}</p>
    </div>
  );
}
