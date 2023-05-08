import { Box, IconButton, Typography } from "@mui/material";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { useUiStore } from "../../hooks";

export const Topbar = () => {
  //

  const { isSidebarOpen, pageActive } = useUiStore();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={3}
      alignItems="center"
    >
      <Box
        display={!isSidebarOpen ? "none" : "flex"}
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
      >
        <img
          type="img/svg"
          alt="profile-user"
          width="32px"
          height="32px"
          src={`../../../public/assets/premolarIcon2.svg`}
          style={{ borderRadius: "20%" }}
        />
        <Typography
          variant="h3"
          color="primary.main"
          fontFamily="Brush Script MT"
          fontWeight="semibold"
          fontSize="40px"
          className=""
        >
          Dental Smile
        </Typography>
      </Box>
      <Typography
        variant="h3"
        color="secondary.main"
        fontWeight="bold"
        fontSize="25px"
        fontStyle="italic"
        sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
      >
        {pageActive}
      </Typography>

      {/* SEARCH BAR */}
      <Box display="flex" gap="20px">
        <IconButton className="btn-menu" sx={{ color: "black" }}>
          <AdminPanelSettingsOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};
