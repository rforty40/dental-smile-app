import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useUiStore } from "../../hooks";
import { Topbar } from "../../ui";

export const DashboardPage = () => {
  const { changePage } = useUiStore();

  useEffect(() => {
    console.log("DashboardPage");
    changePage();
  }, []);
  return (
    <>
      <Topbar />
      <Box m="20px" display="flex" justifyContent="end" className="box-shadow">
        <Typography variant="h5">Dashboard</Typography>
      </Box>
    </>
  );
};
