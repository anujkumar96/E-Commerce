import React from "react";
import { AppBar, Toolbar, Typography, Button, TextField, Box } from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {clientId} from './../utils/constants'

const Navbar = ({ isLoggedIn, setIsLoggedIn, searchTerm, setSearchTerm, darkMode }) => {
  const responseGoogle = (response) => {
    if (response.credential) {
      console.log("Google login successful:", response);
      setIsLoggedIn(true);
    } else {
      console.error("Google login failed:", response);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AppBar position="sticky" sx={{ backgroundColor: darkMode ? "rgba(51, 58, 59, 0.9)" : "rgba(106, 201, 242, 0.9)", padding: "8px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer", color: darkMode ? "white" :' black' }}>
            🛒 E-Commerce
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                      <TextField
              variant="outlined"
              placeholder="Search products..."
              size="small"
              sx={{
                width: "60%",
                bgcolor: darkMode ? "#333333" : "white", 
                borderRadius: "5px",
                color: darkMode ? "white" : "black", 
                "& .MuiOutlinedInput-placeholder": {
                  color: darkMode ? "#b0b0b0" : "#888888",
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </Box>

          {isLoggedIn ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsLoggedIn(false)}
              sx={{ textTransform: "none", fontSize: "16px" }}
            >
              Logout
            </Button>
          ) : (
            <GoogleLogin
             color="success"
              onSuccess={responseGoogle}
              onError={responseGoogle}
              useOneTap
              theme="filled_blue"
              />
          )}
        </Toolbar>
      </AppBar>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
