export default function CreateDepartmentPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Create Department</h1>
      <p>Organization ID: {params.id}</p>
    </div>
  );
}
