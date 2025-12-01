export default function TransferEmployeePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Transfer Employee</h1>
      <p>Employee ID: {params.id}</p>
    </div>
  );
}
