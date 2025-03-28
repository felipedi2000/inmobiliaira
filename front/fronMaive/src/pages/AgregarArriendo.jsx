import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Autocomplete,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import barriosDuitama from "../data/barriosDuitama";
import ArriendosService from "../service/ArriendosService";
import { useNavigate } from "react-router-dom";
import UsuariosService from "../service/UsuariosService";

const tiposInmueble = [
  { value: "Casa" },
  { value: "Apartamento" },
  { value: "Oficina" },
  { value: "Local Comercial" },
  { value: "Bodega" },
  { value: "Finca" },
  { value: "Piso" },
  { value: "Garaje" },
  { value: "Lote" },
];

export default function AgregarArriendo() {
  const [direccion, setDireccion] = useState("");
  const [severity, setSeverity] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [facGas, setFacGas] = useState("");
  const [facLuz, setFacLuz] = useState("");
  const [facAgua, setFacAgua] = useState("");
  const [fechaIn, setFechaIn] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [infoExtra, setInfoExtra] = useState("");
  const [contratoURL, setContratoURL] = useState("");
  const [tipoInmueble, setTipoInmueble] = useState("");
  const [propietario, setPropietario] = useState("");
  const [inquilino, setInquilino] = useState("");

  const [listaUsers, setListaUsers] = useState([]);

  const [barrio, setBarrio] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const summbitForm = async (e) => {
    e.preventDefault();

    if (
      !direccion ||
      !barrio ||
      !tipoInmueble ||
      !fechaIn ||
      !fechaFin ||
      !facGas ||
      !facLuz ||
      !facAgua ||
      !contratoURL ||
      !infoExtra ||
      !propietario ||
      !inquilino
    ) {
      setShowMessage(true);
      setSeverity("warning");
      setTextAlert("Todos los campos son obligatorios");
      return;
    }

    const fechaInicial = new Date(fechaIn);
    const fechaFinal = new Date(fechaFin);

    if (fechaInicial > fechaFinal) {
      setShowMessage(true);
      setSeverity("error");
      setTextAlert(
        "La fecha de inicio no puede ser posterior a la fecha de fin"
      );
      return;
    }

    const jsonArriendo = {
      direccion: direccion,
      tipoInmueble: tipoInmueble.value,
      barrio: barrio.value,
      cuentaAgua: Number(facAgua),
      cuentaLuz: Number(facLuz),
      cuentaGas: Number(facGas),
      fechaIni: fechaIn,
      fechaFin: fechaFin,
      informacionExtra: infoExtra,
      cedulaInquilino: inquilino,
      cedulaPropietario: propietario,
      tipoDocumento: "PDF",
      documento: contratoURL,
    };
    console.log(jsonArriendo);
    const response = await ArriendosService.guardarArriendo(jsonArriendo);
    if (response === "Guardado correctamente") {
      setShowMessage(true);
      setSeverity("success");
      setTextAlert(response);
      setDireccion("");
      setFacGas("");
      setFacLuz("");
      setFacAgua("");
      setFechaIn("");
      setFechaFin("");
      setInfoExtra("");
      setContratoURL("");
      setTipoInmueble("");
      setBarrio("");
      setTimeout(() => {
        setShowMessage(false);
        navigate(-1);
      }, 2000);
    }
  };

  const handleClose = () => {
    setShowMessage(false);
  };

  const fetchData = async () => {
    const jsonIn = await UsuariosService.listarUsuarios();
    setListaUsers(jsonIn);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    title: {
      marginBottom: 2,
    },
  };

  return (
    <Box sx={styles.boxPrincipal}>
      <NavBar />
      <Box
        sx={{
          marginTop: 3,
          padding: 1.5,
          backgroundColor: "white",
          borderRadius: 2,
          width: 0.95,
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={summbitForm}
        >
          <div className="flex gap-[20px] flex-wrap">
            <div className="w-full">
              <Typography variant="h6" sx={styles.title}>
                Datos arriendo
              </Typography>
            </div>
            <div className="grow flex justify-between">
              <TextField
                size="small"
                label="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                sx={{ width: "15%" }}
                type="text"
                variant="outlined"
              />

              <Autocomplete
                size="small"
                sx={{ width: "15%" }}
                value={barrio}
                disablePortal
                options={barriosDuitama}
                getOptionLabel={(option) => option?.value ?? ""}
                onChange={(e, value) => setBarrio(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Barrio" />
                )}
              />

              <Autocomplete
                size="small"
                sx={{ width: "17%" }}
                value={tipoInmueble}
                options={tiposInmueble}
                getOptionLabel={(option) => option?.value ?? ""}
                onChange={(e, value) => setTipoInmueble(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de Inmueble" />
                )}
              />
              <TextField
                size="small"
                label="Fecha inicio"
                value={fechaIn}
                onChange={(e) => setFechaIn(e.target.value)}
                sx={{ width: "20%" }}
                type="date"
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                size="small"
                label="Fecha Fin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                sx={{ width: "20%" }}
                type="date"
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </div>
            <div className="gow flex justify-between">
              <TextField
                size="small"
                label="Cuenta Gas"
                value={facGas}
                onChange={(e) => setFacGas(e.target.value)}
                sx={{ width: "27%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Cuenta Luz"
                value={facLuz}
                onChange={(e) => setFacLuz(e.target.value)}
                sx={{ width: "27%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Cuenta Agua"
                value={facAgua}
                onChange={(e) => setFacAgua(e.target.value)}
                sx={{ width: "27%" }}
                type="text"
                variant="outlined"
              />
            </div>
            <div className="w-full">
              <TextField
                size="small"
                label="Link contrato"
                value={contratoURL}
                onChange={(e) => setContratoURL(e.target.value)}
                sx={{ width: 1 }}
                type="text"
                variant="outlined"
              />
            </div>
            <div className="w-full">
              <TextField
                size="small"
                label="Informacion extra"
                value={infoExtra}
                onChange={(e) => setInfoExtra(e.target.value)}
                sx={{ width: 1 }}
                type="text"
                variant="outlined"
                multiline
                rows={2}
              />
            </div>
          </div>
          <div className="w-full flex ">
            <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 1.5 }}>
              Propietario e inquilino
            </Typography>
          </div>
          <div className="gow flex">
            <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
              <InputLabel id="demo-select-small-label">Propietario</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={propietario}
                label="Propietario"
                onChange={(e) => setPropietario(e.target.value)}
              >
                {listaUsers.length === 0 ? (
                  <MenuItem disabled> No hay usuarios disponibles </MenuItem>
                ) : (
                  listaUsers
                    .filter((item) => item.tipoUsuario === "propietario")
                    .map((usuario) => (
                      <MenuItem key={usuario.id} value={usuario.cedula}>
                        {`${usuario.nombre}, Cédula: ${usuario.cedula}, Teléfono: ${usuario.telefono}`}
                      </MenuItem>
                    ))
                )}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
              <InputLabel id="inquilino-label">Inquilino</InputLabel>
              <Select
                labelId="inquilino-label"
                id="inquilino-select"
                value={inquilino}
                label="Inquilino"
                onChange={(e) => setInquilino(e.target.value)}
              >
                {listaUsers?.length === 0 ? (
                  <MenuItem disabled> No hay usuarios disponibles </MenuItem>
                ) : (
                  listaUsers
                    .filter((item) => item.tipoUsuario === "inquilino")
                    .map((usuario) => (
                      <MenuItem key={usuario.id} value={usuario.cedula}>
                        {`${usuario.nombre}, Cédula: ${usuario.cedula}, Teléfono: ${usuario.telefono}`}
                      </MenuItem>
                    ))
                )}
              </Select>
            </FormControl>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 1.5 }}
            fullWidth
          >
            Enviar
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
