import { useSession } from "../context/session.context";
import NotFoundPage from "../pages/not-found.page";
import HeaderLayout from "../layouts/header.layout";

const AuthProtectedRoute = () => {
  const { session } = useSession();
  if (!session) {
    // or you can redirect to a different page and show a message
    return <NotFoundPage />;
  }
  return <HeaderLayout />;
};

export default AuthProtectedRoute;
