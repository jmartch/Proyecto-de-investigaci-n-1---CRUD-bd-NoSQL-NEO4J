export default function Footer() {
  return (
    <footer className="center" style={{
      height:64, borderTop:'1px solid var(--border)', background:'rgba(17,19,24,.65)'
    }}>
      <div className="container muted">
        © {new Date().getFullYear()} Neo4j CRUD – Frontend
      </div>
    </footer>
  );
}
