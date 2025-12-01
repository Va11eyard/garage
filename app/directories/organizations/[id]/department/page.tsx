export default function DepartmentsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Departments</h1>
      <p>Organization ID: {params.id}</p>
    </div>
  );
}
