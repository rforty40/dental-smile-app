import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { ButtonCustom } from "../../ui";
import {
  BorderColor,
  CancelOutlined,
  DeleteForever,
  Edit,
  EditAttributes,
  SaveOutlined,
} from "@mui/icons-material";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";

export const InfoPagePaciente = () => {
  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        // sx={{ backgroundColor: "#c4c4c4" }}
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          // sx={{ backgroundColor: "white" }}
        >
          <Typography variant="h6">Datos personales</Typography>
          <div>
            <ButtonCustom
              altura={"60px"}
              colorf={"transparent"}
              colorh={"transparent"}
              colort={"blueSecondary.main"}
              txt_b={"Editar"}
              flexDir="column-reverse"
              colorth={"black"}
              txt_b_size="12px"
              propsXS={{ boxShadow: "none !important" }}
              iconB={<FaUserEdit />}
            />
            <ButtonCustom
              altura={"60px"}
              colorf={"transparent"}
              colorh={"transparent"}
              colort={"error.main"}
              txt_b={"Eliminar"}
              flexDir="column-reverse"
              colorth={"black"}
              txt_b_size="12px"
              propsXS={{ boxShadow: "none !important" }}
              iconB={<TiUserDelete />}
            />
          </div>
        </Box>
        <Paper
          elevation={3}
          sx={{ width: "100%" }}
          // sx={{ backgroundColor: "#c4c4c4" }}
        >
          <h1>ssss</h1>
        </Paper>
      </Box>
    </>
  );
};
