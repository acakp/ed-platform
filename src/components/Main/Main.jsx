import './Main.css';

function Main() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="block stack stack-lg">
      <div className="main-hero">
        <div className="main-photo">
          <img src='/main.jpg' alt="" />
        </div>

        <div className="main-content">
          <h1 className="page-title">Наши лекторы — признанные специалисты в своих областях, готовые делиться опытом и знаниями.</h1>

          <form className="search" onSubmit={handleSubmit}>
            <input
              className="search-input"
              type="text"
              placeholder="найти лектора"
            />
            <button className="search-button" type="submit" aria-label="Найти">
              →
            </button>
          </form>
        </div>
      </div>

      <div className="card-grid">
        <article className="card">
          <h2>Подбираем экспертов под задачи</h2>
          <p>
            От профильных дисциплин до узкоспециальных курсов — найдём лектора,
            который точно соответствует вашим целям и уровню подготовки.
          </p>
        </article>
        <article className="card">
          <h2>Гибкие форматы занятий</h2>
          <p>
            Очный или онлайн формат, индивидуальные занятия и групповые программы.
            Адаптируем график и программу под ваши потребности.
          </p>
        </article>
        <article className="card">
          <h2>Проверенные преподаватели</h2>
          <p>
            У каждого лектора указаны образование, научная степень, опыт работы
            и подробная программа дисциплин, чтобы вы могли сделать осознанный выбор.
          </p>
        </article>
      </div>

      <div className="main-stats">
        <div className="stat-item">
          <span className="stat-number">5+</span>
          <span className="stat-label">опытных лекторов</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">15+</span>
          <span className="stat-label">дисциплин</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">гибкие</span>
          <span className="stat-label">тарифы</span>
        </div>
      </div>
    </section>
  );
}

export default Main;
