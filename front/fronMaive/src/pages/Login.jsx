import { Box, Typography, TextField, Snackbar, Button, Alert } from "@mui/material";
import imagenes from "../assets/imagenes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminService from "../service/AdminService";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [severity, setSeverity] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const navigate = useNavigate();

  const styles = {
    boxPrincipal: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background:
        "radial-gradient(circle, #575db4 0%, rgba(157,186,221,1) 100%)",
      margin: -1,
    },
    box: {
      width: "45%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#006d75",
      borderRadius: 2,
      boxShadow: 2,
      boxSizing: "border-box",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#eaeeeedc",
      borderTopRightRadius: 7,
      borderBottomRightRadius: 7,
      height: "100%",
      width: "100%",
    },
    title: {
      marginBottom: 2,
      textAlign: "center",
    },
    input: {
      marginBottom: 2,
      marginTop: 2,
      width: "80%",
      display: "flex",
      justifyContent: "center",
    },
    button: {
      marginTop: 1,
      width: "80%",
      borderRadius: 10,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setIsLoggedIn(false);
      setShowMessage(true);
      setSeverity("warning");
      setTextAlert("Llene todos los campos");
      return;
    }
     
    const cred = { username: email, password: password };
    console.log(cred)

    try {
      const response = await AdminService.loginUser(cred);

      if (response === "OK") {
        const userData = { username: email, isLoggedIn: true };
        localStorage.setItem("auth", JSON.stringify(userData));
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
        setShowMessage(true);
        setSeverity("success");
        setTextAlert("Usuario clave correctos");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      } else {
        setIsLoggedIn(false);
        setShowMessage(true);
        setEmail("");
        setPassword("");
        setIsLoggedIn(false);
        setShowMessage(true);
        setSeverity("error");
        setTextAlert("Credenciales incorrectas");

      }
    } catch (error) {
      setSeverity(error);
      setTextAlert("Usuario o clave incorrectos");
    }
  };

  const handleClose = () => {
    setShowMessage(false);
  };

  return (
    <Box sx={styles.boxPrincipal}>
      <Box sx={styles.box}>
        <img
          src={imagenes["img1"]}
          style={{
            width: "230px",
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
          }}
          alt="Login"
        />
        <form onSubmit={handleSubmit} style={styles.form}>
          <Typography variant="h4" sx={styles.title}>
            Bienvenido
          </Typography>

          <TextField
            size="small"
            label="Correo electrónico"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={styles.input}
          />

          <TextField
            size="small"
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={styles.input}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={styles.button}
          >
            Iniciar sesión
          </Button>

          <Snackbar
            open={showMessage}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {textAlert}
            </Alert>
          </Snackbar>
        </form>
      </Box>
    </Box>
  );
}
