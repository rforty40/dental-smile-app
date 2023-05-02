import { Box, IconButton, Typography, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { useUiStore } from "../../hooks";

export const Topbar = () => {
  //

  const { palette } = useTheme();

  const { isSidebarOpen, pageActive } = useUiStore();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      alignItems="center"
    >
      <Typography
        // visibility={!isSidebarOpen && "hidden"}
        variant="h3"
        color={`${palette.secondary.main}`}
        fontWeight="bold"
        fontSize="25px"
      >
        {isSidebarOpen ? `Dental Smile  >  ${pageActive}` : `${pageActive}`}
      </Typography>

      {/* SEARCH BAR */}
      <Box display="flex" gap="30px">
        <Box
          display="flex"
          border={`2px solid ${palette.primary.light}`}
          borderRadius="5px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Buscar paciente" />
          <IconButton className="btn-menu" type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS */}
        <IconButton className="btn-menu">
          <AdminPanelSettingsOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

/*
  <IconButton onClick={colorMode.toggleColorMode}>
          {/* {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : ( }
          <LightModeOutlinedIcon />
          {/* )} }
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
 */
