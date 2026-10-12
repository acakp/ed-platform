import './LectorDetail.css';
import ContactForm from './ContactForm';
import LectorPhoto from './LectorPhoto';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function pluralYears(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return 'год';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'года';
  return 'лет';
}

function formatPrice(tariff) {
  const amount = `${tariff.currency} ${tariff.price.toLocaleString('ru-RU')}`;
  return tariff.priceFrom ? `от ${amount}` : amount;
}

function LectorDetail({ lector, onBack }) {
  const [program, setProgram] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const degree =
    lector.academicDegree && lector.academicDegree !== 'нет' ? lector.academicDegree : null;

  useEffect(() => {
    if (!program) return undefined;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setProgram(null);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [program]);

  return (
    <section className="block lector-detail stack stack-md">
      <button type="button" className="btn btn-secondary" onClick={onBack}>
        ← Назад к списку лекторов
      </button>

      <header className="lector-detail-header">
        <div className="lector-detail-photo">
          <LectorPhoto lector={lector} />
        </div>
        <div className="lector-detail-main">
          <h1 className="page-title">{lector.fullName}</h1>
          <dl className="lector-detail-meta">
            <div>
              <dt>Образование</dt>
              <dd>{lector.education}</dd>
            </div>
            <div>
              <dt>Стаж преподавания</dt>
              <dd>
                {lector.experienceYears} {pluralYears(lector.experienceYears)}
              </dd>
            </div>
            {degree && (
              <div>
                <dt>Учёная степень</dt>
                <dd>{degree}</dd>
              </div>
            )}
          </dl>
          {lector.bio ? <p className="lector-detail-bio">{lector.bio}</p> : null}
          <button type="button" className="btn btn-primary" onClick={() => setContactOpen(true)}>
            Связаться
          </button>
        </div>
      </header>

      <section className="lector-section">
        <h2 className="section-title">Преподаваемые дисциплины</h2>
        <div className="card-grid">
          {lector.disciplines.map((discipline) => (
            <article className="card discipline-card" key={discipline.title}>
              <h3 className="section-title">{discipline.title}</h3>
              <p className="discipline-description">{discipline.description}</p>
              {discipline.topics?.length > 0 && (
                <button
                  type="button"
                  className="topics-open"
                  onClick={() => setProgram(discipline)}
                >
                  Программа курса
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="lector-section">
        <h2 className="section-title">Тарифы</h2>
        <div className="tariffs-table">
          <div className="tariffs-header">
            <div className="tariff-cell">Услуга</div>
            <div className="tariff-cell tariff-price">Стоимость</div>
          </div>
          {lector.tariffs.map((tariff) => (
            <div className="tariff-row" key={tariff.name}>
              <div className="tariff-cell">{tariff.name}</div>
              <div className="tariff-cell tariff-price">{formatPrice(tariff)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="lector-section">
        <h2 className="section-title">Полезная информация</h2>
        <div className="card-grid">
          <article className="card card-muted">
            <h3>Формат занятий</h3>
            <p>Очные и онлайн-встречи. Программу можно адаптировать под цель и уровень.</p>
          </article>
          <article className="card card-muted">
            <h3>Как связаться</h3>
            <p>Нажмите «Связаться» и коротко опишите задачу: экзамен, проект или курс.</p>
          </article>
          <article className="card card-muted">
            <h3>Гибкий подход</h3>
            <p>План занятий собирается под экзамен, проект, повышение квалификации или олимпиаду.</p>
          </article>
        </div>
      </section>
    {program && createPortal(
        <div className="program-overlay" onClick={() => setProgram(null)}>
          <div
            className="program-dialog card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="program-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="program-dialog-header">
              <h3 className="section-title" id="program-title">{program.title}</h3>
              <button
                ref={closeButtonRef}
                type="button"
                className="program-close"
                aria-label="Закрыть программу"
                onClick={() => setProgram(null)}
              >
                ×
              </button>
            </div>
            <ol className="topics-list">
              {program.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ol>
          </div>
        </div>,
        document.body,
      )}
      {contactOpen ? (
        <ContactForm lector={lector} onClose={() => setContactOpen(false)} />
      ) : null}
    </section>
  );
}

export default LectorDetail;
