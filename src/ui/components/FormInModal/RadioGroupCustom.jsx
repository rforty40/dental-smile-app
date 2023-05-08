import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

export const RadioGroupCustom = ({ title, colorRadio, radioOptions }) => {
  return (
    <>
      <p
        style={{
          fontSize: "13px",
          padding: "5px 0px 0px 0px",
          color: "#602a90",
        }}
      >
        {title}
      </p>
      <RadioGroup row name="row-radio-buttons-group">
        {radioOptions.map((radio) => {
          return (
            <FormControlLabel
              key={radio}
              value={radio}
              control={
                <Radio
                  sx={{
                    "&, &.Mui-checked": {
                      color: colorRadio,
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  {radio}
                </Typography>
              }
            />
          );
        })}
      </RadioGroup>
    </>
  );
};
