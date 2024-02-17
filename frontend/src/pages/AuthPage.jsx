import { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = "";
    let requestData = {};

    if (isLogin) {
      // Login request
      url = "/api/login";
      requestData = {
        username: formData.username,
        password: formData.password,
      };
    } else {
      // Signup request
      url = "/api/register";
      requestData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      console.log(responseData);

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ marginTop: "2rem" }}
      >
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "2rem", backgroundColor: "#828282" }}
          >
            <Typography variant="h5" align="center">
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  required={!isLogin}
                />
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ marginTop: "1rem", backgroundColor: "#FF8911" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </form>
            <Typography align="center" style={{ marginTop: "1rem" }}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Button
                style={{ backgroundColor: "#FF8911" }}
                onClick={toggleForm}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </Typography>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AuthPage;
