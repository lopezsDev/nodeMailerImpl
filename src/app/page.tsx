// pages/index.tsx

import EmailForm from '../components/emailForm';

const Home: React.FC = () => {
  return (
      <div>
        <h1>Enviar un correo electrónico</h1>
        <EmailForm />
      </div>
  );
}

export default Home;
