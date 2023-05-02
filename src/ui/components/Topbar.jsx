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
      p={3}
      alignItems="center"
    >
      <Box
        display={!isSidebarOpen ? "none" : "flex"}
        alignItems="center"
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
          color={palette.primary.main}
          fontFamily="Brush Script MT"
          fontWeight="semibold"
          fontSize="40px"
          sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.40) !important" }}
        >
          Dental Smile
        </Typography>
      </Box>

      <Typography
        variant="h3"
        color={palette.secondary.light}
        fontWeight="bold"
        fontSize="25px"
        fontStyle="italic"
        sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
      >
        {pageActive}
      </Typography>

      {/* SEARCH BAR */}
      <Box display="flex" gap="20px">
        <Box
          className="box-shadow"
          display="flex"
          border={`2px solid ${palette.primary.light}`}
          borderRadius="5px"
          sx={{ backgroundColor: "white" }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              input: {
                color: "black",
                "&::placeholder": { opacity: 1 },
              },
            }}
            placeholder="Buscar paciente"
          />
          <IconButton
            className="btn-menu"
            type="button"
            sx={{ p: 1, color: "black" }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS */}
        <IconButton className="btn-menu" sx={{ color: "black" }}>
          <AdminPanelSettingsOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};
