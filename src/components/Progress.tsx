import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Progress = () => {
  return (
    <Box
      p={2}
      pb={10}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress />
    </Box>
  );
};

export default Progress;
