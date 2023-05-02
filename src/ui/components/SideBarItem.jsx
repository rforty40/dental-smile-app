import { Typography } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export const SideBarItem = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  setHover,
}) => {
  //

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "black",
      }}
      onClick={() => {
        setSelected(title);
        setHover(false);
      }}
      onMouseOver={() => {
        if (selected === title) {
          setHover(false);

          return;
        }
        setHover(true);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
