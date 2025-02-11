import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import CardComponent from '../components/CardComponent';
import imagenes from '../assets/imagenes';
import React from 'react'

export default function Dashboard() {

  const styles = {
    boxPrincipal: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "100vh",
      background:
        "radial-gradient(circle, #575db4 0%, rgba(157,186,221,1) 100%)",
      margin: -1,
    },
  };
  return (
  <Box sx={styles.boxPrincipal}>
    <NavBar/>
    <Box sx={{display: "flex", marginTop: "2rem"}}>
      <CardComponent imageUrl={imagenes["casa"]} route='/arriendos' title='arriendos'/>
      <CardComponent imageUrl={imagenes["users"]} route='/usuarios' title='usuarios'/>
      <CardComponent imageUrl={imagenes["guardar"]} route='/agregarArriendo' title='agregar arriendo'/>
    </Box>
  </Box>
  );
}
