export function HomePage() {
  const baseUrl =
    process.env.REACT_APP_API_BASE_URL ?? 'https://localhost:5001';

  return (
    <div className="page">

      <h2 className="page-title">Home</h2>

      <div className="card">
        <p>
          <strong>URL da API:</strong>{' '}
          <code>{baseUrl}</code>
        </p>

        <p className="muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatum, aliquam animi quibusdam, exercitationem expedita
          molestiae, earum reiciendis minus facere veritatis eveniet.
          Veniam tempora et rerum saepe aliquid repellendus laboriosam
          consequatur.
        </p>
      </div>
    </div>
  );
}