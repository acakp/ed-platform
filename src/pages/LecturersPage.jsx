import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LectorPhoto from '../components/Lectors/LectorPhoto';
import LECTORS_DATA from '../components/Lectors/lectorsData';
import '../components/Lectors/Lectors.css';

function plural(count, one, few, many) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function lectorText(lector) {
  return [
    lector.fullName,
    lector.education,
    lector.academicDegree,
    lector.bio,
    ...lector.disciplines.flatMap((discipline) => [
      discipline.title,
      discipline.description,
    ]),
  ]
    .join(' ')
    .toLowerCase();
}

function LecturerCard({ lecturer }) {
  console.log('Рендер карточки: ' + lecturer.fullName);

  return (
    <article className="lector">
      <Link className="card lector-open" to={`/lecturers/${lecturer.id}`}>
        <span className="lector-photo">
          <LectorPhoto lector={lecturer} />
        </span>
        <span className="lector-info">
          <span className="lector-name">{lecturer.fullName}</span>
          <span className="lector-degree">
            {lecturer.academicDegree === 'нет'
              ? lecturer.education
              : lecturer.academicDegree}
          </span>
          <span className="lector-disciplines">
            {lecturer.disciplines.map((discipline) => discipline.title).join(' / ')}
          </span>
          <span className="lector-meta">
            <span>
              Стаж: {lecturer.experienceYears}{' '}
              {plural(lecturer.experienceYears, 'год', 'года', 'лет')}
            </span>
            <span>
              {lecturer.disciplines.length}{' '}
              {plural(lecturer.disciplines.length, 'дисциплина', 'дисциплины', 'дисциплин')}
            </span>
            {lecturer.tariffs[0] && (
              <span>от {lecturer.tariffs[0].price.toLocaleString('ru-RU')} ₽</span>
            )}
          </span>
        </span>
      </Link>
    </article>
  );
}

function LecturersPage() {
  const [query, setQuery] = useState('');

  const filteredLectors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return LECTORS_DATA;
    return LECTORS_DATA.filter((lector) => lectorText(lector).includes(normalized));
  }, [query]);

  return (
    <section className="block lectors stack">
      <header className="lectors-header">
        <div>
          <h1 className="page-title">Лекторы</h1>
        </div>
        <label className="lectors-search">
          <span className="visually-hidden">Найти лектора</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Имя, дисциплина или вуз"
          />
        </label>
      </header>

      {filteredLectors.length === 0 ? (
        <p className="card card-muted lectors-empty">
          {LECTORS_DATA.length === 0
            ? 'Список лекторов пока пуст - загляните позже.'
            : `Никого не нашли по запросу "${query.trim()}".`}
        </p>
      ) : (
        <div className="lectors-list">
          {filteredLectors.map((lecturer) => (
            <LecturerCard lecturer={lecturer} key={lecturer.id} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LecturersPage;
