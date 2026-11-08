import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="block stack">
      <h1 className="page-title">Страница не найдена</h1>
      <p className="lead">Такого адреса нет. Вернитесь на главную или к списку лекторов.</p>
      <div className="not-found-links">
        <Link className="btn btn-primary" to="/">На главную</Link>
        <Link className="btn btn-secondary" to="/lecturers">К лекторам</Link>
      </div>
    </section>
  );
}

export default NotFound;
