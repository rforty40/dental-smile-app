import { Typography } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useUiStore } from "../../hooks";

export const SideBarItem = ({ title, to, icon }) => {
  //

  const { pageActive, changeHover } = useUiStore();

  return (
    <MenuItem
      active={pageActive === title}
      style={{
        color: "black",
      }}
      onClick={() => {
        changeHover(false);
      }}
      onMouseOver={() => {
        if (pageActive === title) {
          changeHover(false);

          return;
        }
        changeHover(true);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
