import { useState, useEffect  } from "react";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import EditarBoton2 from "../components/EditarBoton2";
import UsuariosService from "../service/UsuariosService";
import CreateBoton from "../components/CreateBoton";
import BorrarBoton from "../components/BorrarBoton";

const StyledWrapper = styled.div`
  .table-wrapper {
    max-width: 99%;
    border-radius: 10px;
    border: 1px solid #ffffff;
    margin-top: 16px;
    max-height: 510px;
    white-space: nowrap;
    overflow: auto;
    overflow-x: scroll;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    background-color: rgb(44, 44, 44);
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: block;
    margin-top: -1px;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color de fondo del rastro */
    border-radius: 10px; /* Esquinas redondeadas */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  thead {
    background-color: rgb(67, 67, 67);
    color: white;
    text-align: left;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  th,
  td {
    padding: 12px 16px;
    border: 1px solid rgb(167, 159, 159);
  }

  tbody tr:nth-child(even) {
    background-color: rgb(234, 235, 239);
    color: black;
  }

  tbody tr:nth-child(odd) {
    background-color: white;
    color: black;
  }

`;

export default function Usarios() {
  const [data, setData] = useState([]);

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

  const fetchData = async () => {
    try {
      const jsonData1 = await UsuariosService.listarUsuarios();
      const jsonData = jsonData1.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setData(jsonData);
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledWrapper>
      <Box sx={styles.boxPrincipal}>
        <NavBar />
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Cédula</th>
                <th>Telefono</th>
                <th>Rol</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.cedula}</td>
                    <td>{item.telefono}</td>
                    <td>{item.tipoUsuario}</td>
                    <td>
                      <EditarBoton2 item={item} fetchData={fetchData} />
                    </td>
                    <td>
                      <BorrarBoton id={item.id} fetchData={fetchData} tipo="usuario"/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No hay usuarios disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <br></br>
        <CreateBoton fetchData={fetchData}/>
      </Box>      
    </StyledWrapper>
  );
}
