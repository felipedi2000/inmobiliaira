import React from "react";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContentText,
	Autocomplete,
	Snackbar,
	Alert,
} from "@mui/material";
import UsuariosService from "../service/UsuariosService";


const rolUsuarios = [
  { value: "Cliente" },
  { value: "Propietario" },
  { value: "Inquilino" },
];


const CreateBoton = ({fetchData}) => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
	const [rol, setRol] = useState("")
	const [severity, setSeverity] = useState("");
	const [textAlert, setTextAlert] = useState("");
	const [showMessage, setShowMessage] = useState(false);

  const handleConfirmCreate = async () => {
		if(!nombre || !cedula || !telefono || !rol) {
			setShowMessage(true);
      setSeverity("warning");
      setTextAlert("Todos los campos son obligatorios");
			setTimeout(()=>{
				setShowMessage(false);
			},2000)
			return;
		}
		try {
      setOpen(true);
      const userNew = {
        nombre: nombre,
        cedula: cedula,
        telefono: telefono,
				tipoUsuario: rol.value.toLowerCase()
      };

			console.log(userNew);
      const response = await UsuariosService.guardarUsuario(
        userNew
      );
      if (response === "Usuario registrado") {
        await fetchData();
				setNombre("");
				setCedula("");
				setTelefono("");
				setRol("");
				setShowMessage(true);
				setSeverity("success");
				setTextAlert("Registrado!!");
				setTimeout(()=>{
					setShowMessage(false);
					setOpen(false);
				},2000)
      } else if (response === "Error Cédula ya registrada") {
				setShowMessage(true);
				setSeverity("error");
				setTextAlert("Cedula ya registrada!");
				setTimeout(()=>{
					setShowMessage(false);
				},2000)
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      window.alert("Error inesperado al actualizar el usuario.");
    }
  };

  const handleClose = () => {
    setNombre("");
    setCedula("");
    setTelefono("");
		setRol("");
    setOpen(false);
  };

  const onHandleClick = () => {
    setOpen(true);
  };
  return (
    <StyledWrapper>
      <button onClick={onHandleClick}>
        <span>
          <svg
            height={24}
            width={24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor" />
          </svg>
          Agregar
        </span>
      </button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Registrar usuario</DialogTitle>
        <DialogContent>
          <DialogContentText component="span">
            <div className="grow flex mt-2">
              <div className="flex gap-[20px] ">
                <TextField
                  size="small"
                  label="Nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  size="small"
                  label="Celular"
                  onChange={(e) => setTelefono(e.target.value)}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  size="small"
                  label="Cedula"
                  onChange={(e) => setCedula(e.target.value)}
                  type="text"
                  variant="outlined"
                />
                <Autocomplete
                  size="small"
                  sx={{ width: "30%" }}
                  value={rol}
                  options={rolUsuarios}
                  getOptionLabel={(option) => option?.value ?? ""}
                  onChange={(e, value) => setRol(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Rol" />
                  )}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "red" }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmCreate} sx={{ color: "Blue" }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {textAlert}
        </Alert>
      </Snackbar>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    border: 2px solid #157457;
    background-color: #157457;
    border-radius: 0.9em;
    cursor: pointer;
    padding: 0.8em 1.2em 0.8em 1em;
    transition: all ease-in-out 0.2s;
    font-size: 16px;
  }

  button span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
  }

  button:hover {
    background-color: #156d52;
  }
`;

CreateBoton.propTypes = {
	fetchData: PropTypes.func.isRequired
}

export default CreateBoton;
