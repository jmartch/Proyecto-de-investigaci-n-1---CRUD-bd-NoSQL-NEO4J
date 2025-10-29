import "../styles/CardPost.css";

export default function CardPost({ title, author, content, date }) {
  return (
    <div className="card-post">
      <h2>{title}</h2>
      <p className="meta">
        <strong>{author}</strong> · {new Date(date).toLocaleString()}
      </p>
      <p>{content}</p>
    </div>
  );
}
