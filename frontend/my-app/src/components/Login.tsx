import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Navbar from './Navbar';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔁if already logged in, redirect to homepage
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user]);

  return (
    <>
    <div className='flex flex-col min-h-screen'>
       <Navbar />
      <section className="flex-1">
      </section>
    </div>

    </>
  );
};

export default Login;
