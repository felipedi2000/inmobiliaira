import { Box } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { Button, TextField, Typography, Autocomplete, Snackbar, Alert } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import { RegContext } from "../context/RegContext";
import barriosDuitama from "../data/barriosDuitama";
import ArriendosService from "../service/ArriendosService";
import { useNavigate } from "react-router-dom";

const tiposInmueble = [
  { value: "Casa" },
  { value: "Apartamento" },
  { value: "Oficina" },
  { value: "Local Comercial" },
  { value: "Bodega" },
  { value: "Finca" },
  { value: "Piso" },
  {value: "Garaje"},
  {value: "Lote"}
];

export default function EditarArriendo() {

  const navigate = useNavigate();

  const { reg, setReg } = useContext(RegContext);

  const [direccion, setDireccion] = useState(reg.direccion || "");
  const [severity, setSeverity] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [facGas, setFacGas] = useState(reg.cuentaGas || "");
  const [facLuz, setFacLuz] = useState(reg.cuentaLuz || "");
  const [facAgua, setFacAgua] = useState(reg.cuentaAgua || "");
  const [fechaIn, setFechaIn] = useState(reg.fechaIni || "");
  const [fechaFin, setFechaFin] = useState(reg.fechaFin || "");
  const [infoExtra, setInfoExtra] = useState(reg.informacionExtra || "");
  const [contratoURL, setContratoURL] = useState(reg.documentosArriendo?.find(doc => doc.tipoDocumento === "contrato")?.documento || "");
  const [propietario, setPropietario] = useState(reg.usuarioPropietario || {});
  const [arrendatario, setArrendatario] = useState(reg.usuarioInquilino || {});
  const [tipoInmueble, setTipoInmueble] = useState(
    tiposInmueble.find((t) => t.value === reg.tipoInmueble) || null   
  );
  const [barrio, setBarrio] = useState(
    barriosDuitama.find((t) => t.value === reg.barrio) || null
  );
  
  const [showMessage, setShowMessage] = useState(false);

  const handlePropietarioChange = (event, field) => {
    setPropietario((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleArrendatarioChange = (event, field) => {
    setArrendatario((prev) => ({ ...prev, [field]: event.target.value }));
  };

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
      !propietario.nombre ||
      !propietario.telefono ||
      !propietario.cedula ||
      !arrendatario.nombre ||
      !arrendatario.telefono ||
      !arrendatario.cedula
    ) {
      setShowMessage(true);
      setSeverity("warning");
      setTextAlert("Todos los campos son obligatorios");
      return;
    }

    const fechaInicial = new Date(fechaIn);
    const fechaFinal = new Date(fechaFin);

    if(fechaInicial > fechaFinal){
      setShowMessage(true);
      setSeverity("error");
      setTextAlert("La fecha de inicio no puede ser posterior a la fecha de fin");
      return;
    }

    const jsonArriendoUp = {
      direccion: direccion,
      tipoInmueble: tipoInmueble.value,
      barrio: barrio.value,
      cuentaAgua: facAgua,
      cuentaLuz: facLuz,
      cuentaGas: facGas,
      fechaIni: fechaIn,
      fechaFin: fechaFin,
      informacionExtra: infoExtra,
      nombreUsuarioInquilino: arrendatario.nombre,
      cedulaInquilino: arrendatario.cedula,
      telefonoInquilino: arrendatario.telefono,
      nombreUsuarioPropietario: propietario.nombre,
      cedulaPropietario: propietario.cedula,
      telefonoPropietario: propietario.telefono,
      idDocumento: reg.documentosArriendo?.find(doc => doc.tipoDocumento === "contrato")?.id,
      documento: contratoURL
    }

    const response = await ArriendosService.actualizarArriendoUsuario(reg.idArriendo, jsonArriendoUp);
    if(response === "Arriendo y documentos actualizados con éxito."){
      setShowMessage(true);
      setSeverity("success");
      setTextAlert("Actualizado!!");
      setTimeout(() => {
        setShowMessage(false);
        navigate(-1);
      }, 2000);
    }else{
      setShowMessage(true);
      setSeverity("error");
      setTextAlert("error!!");
    }
  };

  const handleClose = () => {
    setShowMessage(false);
  };


  useEffect(() => {
    console.log(reg);
  }, [reg]);

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
              />
              <TextField
                size="small"
                label="Fecha Fin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                sx={{ width: "20%" }}
                type="date"
                variant="outlined"
              />
            </div>
            <div className="gow flex justify-between">
              <TextField
                size="small"
                label="Cuenta Gas"
                value={facGas}
                onChange={(e) => setFacGas(e.target.value)}
                sx={{ width: "20%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Cuenta Luz"
                value={facLuz}
                onChange={(e) => setFacLuz(e.target.value)}
                sx={{ width: "20%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Cuenta Agua"
                value={facAgua}
                onChange={(e) => setFacAgua(e.target.value)}
                sx={{ width: "20%" }}
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
              Datos propietario
            </Typography>
            <Typography
              variant="h6"
              sx={{ marginTop: 1, marginBottom: 1.5, marginLeft: 57 }}
            >
              Datos Inquilino
            </Typography>
          </div>
          <div className="grow flex">
            <div className="flex gap-[20px]">
              <TextField
                size="small"
                label="Nombre"
                value={propietario.nombre || ""}
                onChange={(e) => handlePropietarioChange(e, "nombre")}
                sx={{ width: "15%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Celular"
                value={propietario.telefono || ""}
                onChange={(e) => handlePropietarioChange(e, "telefono")}
                sx={{ width: "15%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Cedula"
                value={propietario.cedula || ""}
                onChange={(e) => handlePropietarioChange(e, "cedula")}
                sx={{ width: "15%" }}
                type="text"
                variant="outlined"
              />

              <TextField
                size="small"
                label="Nombre"
                value={arrendatario.nombre || ""}
                onChange={(e) => handleArrendatarioChange(e, "nombre")}
                sx={{ width: "15%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Celular"
                value={arrendatario.telefono || ""}
                onChange={(e) => handleArrendatarioChange(e, "telefono")}
                sx={{ width: "15%" }}
                type="text"
                variant="outlined"
              />
              <TextField
                size="small"
                label="Cedula"
                value={arrendatario.cedula || ""}
                onChange={(e) => handleArrendatarioChange(e, "cedula")}
                sx={{ width: "15%" }}
                type="text"
                variant="outlined"
              />
            </div>
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
