import { Box, Typography } from "@mui/material";

export const MenuListDashboard = ({ txtLabel, fncList }) => {
  return (
    <Box
      component="div"
      onClick={fncList}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "5px",
        height: "100%",
        width: "35%",
        padding: "10px 10px 10px 25px",

        transition: "color 0.5s, background-color 1s",

        ":hover": {
          backgroundColor: "primary.main",
          color: "white",
          //   marginRight: "calc(100% - 40%)",

          //   transition: "margin-right 1s, color 0.5s, background-color 1s",
          transition: "color 0.5s, background-color 1s",
        },
      }}
    >
      <Typography variant="h5" fontStyle="italic">
        {txtLabel}
      </Typography>
    </Box>
  );
};
