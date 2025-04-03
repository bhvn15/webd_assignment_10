import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/" />;

  // Role mismatch → redirect to their respective dashboard
  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to={user.type === 'admin' ? '/employees' : '/jobs'} />;
  }

  return children;
};
