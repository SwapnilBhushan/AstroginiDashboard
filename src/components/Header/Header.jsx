import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../Theme/Theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography color={colors.greenAccent[400]} variant="h5">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
