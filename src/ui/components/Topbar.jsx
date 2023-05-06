import { Box, IconButton, Typography, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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

      // sx={{
      //   backgroundImage: `linear-gradient(90deg,#f5f7fa  ,#7c51a3) !important`,
      // }}
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
        {/* <Box
          className="box-shadow"
          display="flex"
          border={`2px solid primary.light`}
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
        </Box> */}

        <IconButton className="btn-menu" sx={{ color: "black" }}>
          <AdminPanelSettingsOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};
