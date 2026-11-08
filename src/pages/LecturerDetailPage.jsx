import { useNavigate, useParams } from 'react-router-dom';
import LectorDetail from '../components/Lectors/LectorDetail';
import LECTORS_DATA from '../components/Lectors/lectorsData';
import NotFound from './NotFound';

function LecturerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecturer = LECTORS_DATA.find((item) => item.id === id);

  if (!lecturer) return <NotFound />;

  return (
    <LectorDetail
      lector={lecturer}
      onBack={() => navigate('/lecturers')}
    />
  );
}

export default LecturerDetailPage;
