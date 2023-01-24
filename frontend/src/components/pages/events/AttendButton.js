import * as React from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function AttendButton({ openAttendModal, disabled }) {
  return (
    <CardActions sx={{ justifyContent: "center" }}>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          pb: 1,
        }}
      >
        <Button
          color='primary'
          variant='contained'
          onClick={() => openAttendModal()}
          disabled={disabled}
        >
          Attend
        </Button>
      </Box>
    </CardActions>
  );
}
