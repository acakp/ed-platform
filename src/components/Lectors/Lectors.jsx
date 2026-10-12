import './Lectors.css';
import LECTORS_DATA from './lectorsData';
import LectorDetail from './LectorDetail';
import LectorPhoto from './LectorPhoto';
import { useEffect, useMemo, useState } from 'react';

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

function Lectors() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');

  const selectedLector = LECTORS_DATA.find((lector) => lector.id === selectedId) ?? null;

  const filteredLectors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return LECTORS_DATA;
    return LECTORS_DATA.filter((lector) => lectorText(lector).includes(normalized));
  }, [query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedId]);

  const openLector = (id) => {
    setSelectedId(id);
  };

  const handleBack = () => {
    setSelectedId(null);
  };

  if (selectedLector) {
    return <LectorDetail lector={selectedLector} onBack={handleBack} />;
  }

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
          {filteredLectors.map((lector) => (
            <article className="lector" key={lector.id}>
              <button
                type="button"
                className="card lector-open"
                onClick={() => openLector(lector.id)}
              >
                <span className="lector-photo">
                  <LectorPhoto lector={lector} />
                </span>
                <span className="lector-info">
                  <span className="lector-name">{lector.fullName}</span>
                  <span className="lector-degree">
                    {lector.academicDegree === 'нет'
                      ? lector.education
                      : lector.academicDegree}
                  </span>
                  <span className="lector-disciplines">
                    {lector.disciplines.map((discipline) => discipline.title).join(' / ')}
                  </span>
                  <span className="lector-meta">
                    <span>
                      Стаж: {lector.experienceYears}{' '}
                      {plural(lector.experienceYears, 'год', 'года', 'лет')}
                    </span>
                    <span>
                      {lector.disciplines.length}{' '}
                      {plural(lector.disciplines.length, 'дисциплина', 'дисциплины', 'дисциплин')}
                    </span>
                    {lector.tariffs[0] && (
                      <span>от {lector.tariffs[0].price.toLocaleString('ru-RU')} ₽</span>
                    )}
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Lectors;
