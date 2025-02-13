import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import EditarBoton from "../components/EditarBoton";
import BorrarBoton from "../components/BorrarBoton";
import DesacargarBoton from "../components/DesacargarBoton";
import ArriendosService from "../service/ArriendosService";


const StyledWrapper = styled.div`
  .table-wrapper {
    width: 99%;
    max-width: 99%;
    border-radius: 10px;
    border: 1px solid #ffffff;
    margin-top: 16px;
    max-height: 560px;
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

  table td.colBotones{
    transform: translate(10%)
  }
`;

export default function Arriendos() {
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
    const jsonIn = await ArriendosService.listarArriendos();
    setData(jsonIn);
    console.log(jsonIn);
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
                <th>Dirección</th>
                <th>Barrio</th>
                <th>Tipo Inmueble</th>
                <th>Propietario</th>
                <th>Inquilino</th>
                <th>Telefono Inquilino</th>
                <th>Cédula</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Factura Gas</th>
                <th>Factura Agua</th>
                <th>Factura Luz</th>
                <td>Informacion</td>
                <th>Contrato</th>
                <th>Editar</th>
                <th>Emilinar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.idArriendo}>
                    <td>{item.idArriendo}</td>
                    <td>{item.direccion}</td>
                    <td>{item.barrio}</td>
                    <td>{item.tipoInmueble}</td>
                    <td>{item.usuarioPropietario.nombre}</td>
                    <td>{item.usuarioInquilino.nombre}</td>
                    <td>{item.usuarioInquilino.telefono}</td>
                    <td>{item.usuarioInquilino.cedula}</td>
                    <td>{item.fechaIni}</td>
                    <td>{item.fechaFin}</td>
                    <td>{item.cuentaGas}</td>
                    <td>{item.cuentaAgua}</td>
                    <td>{item.cuentaLuz}</td>
                    <td>{item.informacionExtra}</td>
                    <td className="colBotones">
                      <DesacargarBoton url={item.documentosArriendo?.find(doc => doc.tipoDocumento === "contrato")?.documento} />
                    </td>
                    <td className="colBotones">
                      <EditarBoton ruta="/editarArriendos" data={item} />
                    </td>
                    <td className="colBotones">
                      <BorrarBoton id={item.idArriendo} fetchData={fetchData} tipo="arriendo"/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17">No hay arriendos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Box>
    </StyledWrapper>
  );
}
