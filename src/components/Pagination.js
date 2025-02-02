import React from "react";
import { Button, Box, Typography } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, pb:2 }}>
      <Button
        variant="contained"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Typography variant="h6" sx={{ mx: 2 }}>
        {currentPage} / {totalPages}
      </Typography>
      <Button
        variant="contained"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
