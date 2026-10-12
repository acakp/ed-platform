import Main from './components/Main/Main';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Lectors from './components/Lectors/Lectors';
import Partners from './components/Partners/Partners';
import { useState } from 'react';

const SECTIONS = [
  { id: 'main', label: 'Главная' },
  { id: 'about', label: 'О нас' },
  { id: 'lectors', label: 'Лекторы' },
  { id: 'partners', label: 'Партнеры' },
];

function App() {
  const [section, setSection] = useState('main');

  return (
    <div className="app">
      <Navbar
        sections={SECTIONS}
        current={section}
        onNavigate={setSection}
      />
      <main className="main">
        {section === 'main' && <Main />}
        {section === 'about' && <About />}
        {section === 'lectors' && <Lectors />}
        {section === 'partners' && <Partners />}
      </main>
      <footer className="footer">(С) Шайдуллин А.Р.</footer>
    </div>
  );
}

export default App;
