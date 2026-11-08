import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">(С) Шайдуллин А.Р.</footer>
    </div>
  );
}

export default Layout;
