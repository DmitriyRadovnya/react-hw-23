import { AppBar, Typography } from "@mui/material";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <AppBar position="sticky" elevation={10} square={false} sx={{ p: 1 }}>
        <Typography variant="h4">ToDo - is what i do</Typography>
      </AppBar>
      <Outlet />
    </>
  );
};
