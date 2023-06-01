import { useLogout } from "../hooks/useLogout";

const DashboardView = () => {
  const logout = useLogout();
  return (
    <div>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

export default DashboardView;
