import "../styles/Loader.css";


export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}
