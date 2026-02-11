import { Navigate } from "react-router-dom";

function ProtectedRoute({ session, children }) {
  if (!session) {
    return <Navigate to="/adminForm" replace />
  }

  return children
}

export default ProtectedRoute