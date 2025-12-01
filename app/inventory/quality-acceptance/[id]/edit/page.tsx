export default function EditQualityAcceptancePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Quality Acceptance</h1>
      <p>Acceptance ID: {params.id}</p>
    </div>
  );
}
