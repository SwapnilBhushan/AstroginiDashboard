import React, { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { tokens } from "../../Theme/Theme";
import axios from "axios";
import Service_URL from "../../Constant";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.astrogini.org/">
        Astrogini
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const response = await axios
        .post(`${Service_URL}/admin-login`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          const token = res.data.token;
          const userId = res.data.userId;
          const role = res.data.role;
          localStorage.setItem("authToken", token);
          // localStorage.setItem("userId", userId);
          // localStorage.setItem("role", role);
          console.log(token, userId, role);
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkLogInStatus = () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          navigation.navigate("/");
        } else {
          // Token not found, show the login screen
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    checkLogInStatus();
  }, []); // Pass an empty dependency array to run this effect only once
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <CssBaseline /> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // onChange={(e) =>
                //   setFormData({ ...formData, email: e.target.value })
                // }
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { color: colors.blueAccent[100], fontSize: 14 },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                // onChange={(e) =>
                //   setFormData({ ...formData, password: e.target.value })
                // }
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: { color: colors.blueAccent[100], fontSize: 14 },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="h6" color={colors.grey[100]}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="h6" color={colors.grey[100]}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
