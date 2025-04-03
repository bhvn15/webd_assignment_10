import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  console.log("🛡️ ProtectedRoute - User:", user);
  console.log("✅ Allowed Roles:", allowedRoles);

  // Not logged in → redirect to login
  if (!user) {
    console.warn("🔒 User not logged in. Redirecting to login.");
    return <Navigate to="/" />;
  }

  // Role mismatch → redirect to appropriate dashboard
  if (allowedRoles && !allowedRoles.includes(user.type)) {
    console.warn(`🚫 Access denied for user type: ${user.type}. Redirecting...`);
    return <Navigate to={user.type === 'admin' ? '/employees' : '/jobs'} />;
  }

  return children;
};
