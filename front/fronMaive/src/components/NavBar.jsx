import React from 'react'
import { Box, AppBar, Typography, Avatar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imagenes from '../assets/imagenes';
import Animation from './Animation';
import SalirBoton from './SalirBoton';

export default function NavBar() {
  const navigate = useNavigate();

  const goHome = () =>{
    navigate("/dashboard");
  }


  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "#157457", height: "70px"}}>
        <Toolbar>
          <Avatar onClick={goHome} src={imagenes["img3"]} 
          sx={{ 
            cursor: "pointer",
            marginRight: 2, 
            width: "60px", 
            height: "auto", marginTop: 0.8, 
            "&:hover": {
              color: "blue",
              transform: "scale(1.1)",
          }}}>
          </Avatar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 , display: "flex", alignItems: "center", gap: "3px"}}>
            Hola administrador
            <Animation />
          </Typography>
          <SalirBoton/>   
        </Toolbar>
      </AppBar>
    </Box>
  );
}
