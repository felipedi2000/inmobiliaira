import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Dialog, DialogContent, Button, DialogTitle, DialogActions, DialogContentText, TextField } from '@mui/material';
import UsuariosService from '../service/UsuariosService';

const EditarBoton2 = ({item, fetchData}) => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(item.nombre || "");
  const [cedula, setCedula] = useState(item.cedula || "");
  const [telefono, setTelefono] = useState(item.telefono || "");

  const handleConfirmUpdate = async () => {
    try {
      setOpen(true);
      const itemUpdate = {
        nombre: nombre,
        cedula: cedula,
        telefono: telefono,
      };

      const response = await UsuariosService.actualizarUsuario(
        item.id,
        itemUpdate
      );
      if (response === "Usuario actualizado con éxito") {
        setOpen(false);
        await fetchData();
      } else if (response === "Error al actualizar: Cédula ya registrada") {
        window.alert("Error: La cédula ya está registrada.");
        setOpen(false);
      } else if (response === "Usuario actualizado con mismos datos") {
        window.alert("El usuario ya tenía los mismos datos.");
        setOpen(false);
      } else {
        window.alert("Hubo un error al actualizar el usuario.");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      window.alert("Error inesperado al actualizar el usuario.");
    }
  };

  const handleClose = () => {
    setNombre(item.nombre);
    setCedula(item.cedula);
    setTelefono(item.telefono);
    setOpen(false);
  };

  const onHandleClick = () => {
    setOpen(true);
  };

  return (
    <StyledWrapper>
      <button className="button" onClick={onHandleClick}>
        <svg
          className="svg-icon"
          fill="none"
          height={24}
          viewBox="0 0 24 24"
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#a649da" strokeLinecap="round" strokeWidth={2}>
            <path d="m20 20h-16" />
            <path
              clipRule="evenodd"
              d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z"
              fillRule="evenodd"
            />
          </g>
        </svg>
        <span className="lable">Editar</span>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar usuario</DialogTitle>
        <DialogContent>
          <DialogContentText component="span">
            <div className="grow flex mt-2">
              <div className="flex gap-[20px] ">
                <TextField
                  size="small"
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  size="small"
                  label="Celular"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  size="small"
                  label="Cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  type="text"
                  variant="outlined"
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "red" }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmUpdate} sx={{ color: "Blue" }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 2px;
    height: 30px;
    width: 84px;
    border: none;
    background: #a549da3d;
    border-radius: 20px;
    cursor: pointer;
  }

  .lable {
    line-height: 22px;
    font-size: 14px;
    color: #A649DA;
    font-family: sans-serif;
    letter-spacing: 1px;
  }

  .button:hover {
    background: #a549da62;
  }

  .button:hover .svg-icon {
    animation: lr 1s linear infinite;
  }

  @keyframes lr {
    0% {
      transform: translateX(0);
    }

    25% {
      transform: translateX(-1px);
    }

    75% {
      transform: translateX(1px);
    }

    100% {
      transform: translateX(0);
    }
  }`;

EditarBoton2.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
  }),
  fetchData: PropTypes.func.isRequired
};

export default EditarBoton2;
