import React from "react";
import { Box, List, ListItem, Checkbox, FormControlLabel, Button } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Camelcasing } from "./../utils/reusableFunction";

const Sidebar = ({ categories, selectedCategories, handleCategoryChange, darkMode, setDarkMode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "10px",
        bgcolor: "background.paper",
        width: "25vw",
      }}
    >
      <List>
        {categories.map((category) => (
          <ListItem key={category}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={Camelcasing(category)}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setDarkMode((prev) => !prev)}
          sx={{
            width: "100%",
            textTransform: "none",
            bgcolor: darkMode ? "#333" : "#1976D2",
            color: "#fff",
            "&:hover": { bgcolor: darkMode ? "#444" : "#1565C0" },
          }}
          startIcon={darkMode ? <LightMode /> : <DarkMode />}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
