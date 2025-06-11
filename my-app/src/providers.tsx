import { Outlet } from "react-router";
import SessionProvider from "./context/session.context";

const Providers = () => {
  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
};

export default Providers;
