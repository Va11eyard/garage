export default function DismissEmployeePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Dismiss Employee</h1>
      <p>Employee ID: {params.id}</p>
    </div>
  );
}
