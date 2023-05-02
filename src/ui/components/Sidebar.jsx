import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

/*iconos MUI */
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { SideBarItem } from "./SideBarItem";
import { useSelector } from "react-redux";
import { useUiStore } from "../../hooks";

//
//
/**el sidebar se renderiza con cada click */
export const Sidebar = () => {
  //
  const { palette } = useTheme();

  // hook isCollapsed
  const { isSidebarOpen, changeSidebar } = useUiStore();

  //hook selected
  const [selected, setSelected] = useState("Agenda");

  //hook hover
  const [hover, setHover] = useState(true);

  //retorno
  // Box --> ProSidebar --> Menu --> MenuItem

  return (
    <Box
      sx={{
        height: "100%",
        position: "fixed",
        "& .pro-sidebar-inner": {
          backgroundColor: `${palette.backgroundSidebar.main} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },

        "& .pro-inner-item": {
          padding: "5px 20px 5px 20px !important",
          backgroundPosition: "center",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: `${hover && palette.backgroundSidebar.main}`,
          color: `${hover && `${palette.secondary.main} !important`}`,
        },
        "& .pro-menu-item.active": {
          // backgroundColor: `${!isCollapsed ? "#9c27b0" : "#F2F0F0"}`,
          // color: `${!isCollapsed ? "#ffffff !important" : "#9c27b0!important"}`,
          backgroundColor: `${palette.secondary.main}`,
          color: "white !important",
          clipPath: `${!isSidebarOpen ? "circle(100%)" : "circle(30%)"}`,
          borderRadius: "20px", //`${!isCollapsed ? "20px" : "500px"}`,
        },
      }}
    >
      {/*true(esta contraido) false(esta extendido el sidebar)*/}
      <ProSidebar collapsed={isSidebarOpen}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={() => {
              changeSidebar(!isSidebarOpen);
            }}
            // si esta contraida se muestra el icono de menu
            icon={isSidebarOpen ? <MenuOutlinedIcon /> : undefined}
            style={{
              className: "btn-menu",
              margin: "10px 0 20px 0",
              color: "black",
            }}
          >
            {/* menu extendido */}
            {!isSidebarOpen && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color={palette.primary.main}
                  fontWeight="bold"
                  fontSize="25px"
                >
                  Dental Smile
                </Typography>
                <IconButton
                  className="btn-menu"
                  sx={{ marginLeft: "25px" }}
                  color="black"
                  onClick={() => {
                    changeSidebar(!isSidebarOpen);
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* menu extendido */}
          {!isSidebarOpen && (
            <Box mb="40px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  type="img/svg"
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../../public/assets/premolarIcon.svg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color={palette.primary.main}
                  fontWeight="bold"
                  sx={{ m: "0 0 20px 0", lineHeight: "20px" }}
                >
                  Consultorio Odontológico "Dental Smile"
                </Typography>

                <Typography
                  variant="h7"
                  color={palette.colorIconMolar.main}
                  fontWeight="bold"
                >
                  Dra. Xiomaria Chavez
                </Typography>
              </Box>
            </Box>
          )}

          {/* los enlances */}
          <Box
            paddingLeft={isSidebarOpen ? undefined : "10%"}
            paddingRight={isSidebarOpen ? undefined : "10%"}
          >
            <SideBarItem
              title="Agenda"
              to="/agenda"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              setHover={setHover}
            />
            <SideBarItem
              title="Pacientes"
              to="/pacientes"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              setHover={setHover}
            />

            <SideBarItem
              title="Administración"
              to="/administracion"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              setHover={setHover}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
