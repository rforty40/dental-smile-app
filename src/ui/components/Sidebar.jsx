import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

/*iconos MUI */
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { SideBarItem } from "./SideBarItem";

import { useUiStore } from "../../hooks";

//
//
/**el sidebar se renderiza con cada click */
export const Sidebar = () => {
  //
  const { palette } = useTheme();

  // hook isCollapsed
  const { isSidebarOpen, changeSidebar, isHovereable, changeHover } =
    useUiStore();

  //retorno
  // Box --> ProSidebar --> Menu --> MenuItem

  const onClickMenu = () => {
    changeSidebar(!isSidebarOpen);
    changeHover(false);
  };

  //
  return (
    <Box
      sx={{
        height: "100%",
        position: "fixed",
        boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        "& .pro-sidebar-inner": {
          backgroundImage: `linear-gradient(#f5f7fa,#602a90) !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },

        "& .pro-inner-item": {
          padding: "5px 20px 5px 20px !important",
          backgroundPosition: "center",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: `${isHovereable ? "transparent" : undefined}`,
          color: `${isHovereable ? `white !important` : undefined}`,
        },
        "& .pro-menu-item.active": {
          backgroundColor: `${palette.secondary.main}`,
          color: "white !important",
          borderRadius: "20px",
          clipPath: `${!isSidebarOpen ? "circle(100%)" : "circle(30%)"}`,
        },
      }}
    >
      {/*true(esta contraido) false(esta extendido el sidebar)*/}
      <ProSidebar collapsed={isSidebarOpen}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={onClickMenu}
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
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color={palette.primary.main}
                  fontFamily="Brush Script MT"
                  fontWeight="semibold"
                  fontSize="35px"
                  sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.40)" }}
                >
                  Dental Smile
                </Typography>

                <IconButton
                  className="btn-menu"
                  sx={{ marginLeft: "25px" }}
                  onClick={onClickMenu}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* menu extendido */}
          {!isSidebarOpen && (
            <Box mb="40px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb="20px"
              >
                <img
                  type="img/svg"
                  alt="profile-user"
                  width="80px"
                  height="80px"
                  src={`../../../public/assets/premolarIcon2.svg`}
                  style={{ borderRadius: "20%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color={palette.primary.main}
                  fontWeight="bold"
                  sx={{
                    m: "0 0 20px 0",
                    lineHeight: "25px",
                  }}
                >
                  Consultorio Odontológico
                  <span
                    style={{
                      fontFamily: "Brush Script MT",
                      fontSize: "30px",
                      fontWeight: "normal",
                      textShadow: "0px 2px 2px rgba(0,0,0,0.40) !important",
                    }}
                  >
                    "Dental Smile"
                  </span>
                </Typography>

                <Typography
                  variant="h5"
                  color={palette.primary.main}
                  fontFamily="Brush Script MT"
                  fontWeight="semibold"
                >
                  Dra. Xiomara Chávez
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
            />
            <SideBarItem
              title="Pacientes"
              to="/pacientes"
              icon={<PersonOutlinedIcon />}
            />

            <SideBarItem
              title="Administración"
              to="/administracion"
              icon={<HomeOutlinedIcon />}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
