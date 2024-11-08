import { Button } from "@mui/material";
import { logout } from "../config/firebase";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };
  return (
    <>
      <h1>Dashboard</h1>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};
export default Dashboard;
