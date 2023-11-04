import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main
      style={{
        margin: "15px",
      }}
    >
      <nav className="navbar">
        <h1>Hirefoster Random Users</h1>
      </nav>
      <Outlet />
    </main>
  );
};

export default RootLayout;
