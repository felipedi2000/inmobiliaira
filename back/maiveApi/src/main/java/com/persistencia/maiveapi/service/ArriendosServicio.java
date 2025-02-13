package com.persistencia.maiveapi.service;

import com.persistencia.maiveapi.dto.ArriendosDTO;
import com.persistencia.maiveapi.jpa.entity.Arriendos;
import com.persistencia.maiveapi.jpa.entity.Documentos;
import com.persistencia.maiveapi.jpa.entity.Usuarios;
import com.persistencia.maiveapi.jpa.repository.ArriendosRepositorio;
import com.persistencia.maiveapi.jpa.repository.DocumentosRepositorio;
import com.persistencia.maiveapi.jpa.repository.UsuariosRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArriendosServicio {

    @Autowired
    private ArriendosRepositorio arriendoRepositorio;

    @Autowired
    private UsuariosRepositorio usuariosRepositorio;

    @Autowired
    private DocumentosRepositorio documentosRepositorio;

    public List<Arriendos> listarArriendos() {
        return arriendoRepositorio.findAllWithDocuments();
    }

    public String guardarArriendosCompleto(ArriendosDTO arriendosDTO) {
        try {

            // Crear un nuevo objeto de Arriendo
            Arriendos arriendosNew = new Arriendos();
            arriendosNew.setDireccion(arriendosDTO.getDireccion());
            arriendosNew.setTipoInmueble(arriendosDTO.getTipoInmueble());
            arriendosNew.setBarrio(arriendosDTO.getBarrio());
            arriendosNew.setFechaIni(arriendosDTO.getFechaIni());
            arriendosNew.setFechaFin(arriendosDTO.getFechaFin());
            arriendosNew.setInformacionExtra(arriendosDTO.getInformacionExtra());
            arriendosNew.setCuentaAgua(arriendosDTO.getCuentaAgua());
            arriendosNew.setCuentaLuz(arriendosDTO.getCuentaLuz());
            arriendosNew.setCuentaGas(arriendosDTO.getCuentaGas());

            // Buscar
            Optional<Usuarios> usuarioInquilino = usuariosRepositorio.findByCedula(arriendosDTO.getCedulaInquilino());

            if(usuarioInquilino.isPresent()) {
                arriendosNew.setUsuarioInquilino(usuarioInquilino.get());
            }

            Optional<Usuarios> usuarioPropietario = usuariosRepositorio.findByCedula(arriendosDTO.getCedulaPropietario());

            if(usuarioPropietario.isPresent()) {
                arriendosNew.setUsuarioPropietario(usuarioPropietario.get());
            }

            arriendosNew = arriendoRepositorio.save(arriendosNew);

            // Crear y guardar el documento del arriendo
            Documentos documentoNew = new Documentos();
            documentoNew.setTipoDocumento(arriendosDTO.getTipoDocumento());
            documentoNew.setDocumento(arriendosDTO.getDocumento());
            documentoNew.setTipoDocumento("contrato");
            documentoNew.setArriendo(arriendosNew);
            documentosRepositorio.save(documentoNew);

            return "Guardado correctamente";
        } catch (Exception e) {
            return String.format("Error al guardar el arriendo: %s", e.getMessage());
        }
    }

    public String actualizarArriendo(Long id, ArriendosDTO arriendosDTO) {

        Optional<Arriendos> arriendoOptional = arriendoRepositorio.findById(id);

        if (arriendoOptional.isEmpty()) {
            return "Arriendo no encontrado.";
        }else{
            Arriendos arriendoExistente = arriendoOptional.get();
            arriendoExistente.setDireccion(arriendosDTO.getDireccion());
            arriendoExistente.setTipoInmueble(arriendosDTO.getTipoInmueble());
            arriendoExistente.setBarrio(arriendosDTO.getBarrio());
            arriendoExistente.setCuentaAgua(arriendosDTO.getCuentaAgua());
            arriendoExistente.setCuentaLuz(arriendosDTO.getCuentaLuz());
            arriendoExistente.setCuentaGas(arriendosDTO.getCuentaGas());
            arriendoExistente.setFechaIni(arriendosDTO.getFechaIni());
            arriendoExistente.setFechaFin(arriendosDTO.getFechaFin());
            arriendoExistente.setInformacionExtra(arriendosDTO.getInformacionExtra());

            Optional<Documentos>  documentoOld = documentosRepositorio.findById(arriendosDTO.getIdDocumento());
            Optional<Usuarios> propietario = usuariosRepositorio.findById(arriendoExistente.getPropietarioId());
            Optional<Usuarios> inquilino = usuariosRepositorio.findById(arriendoExistente.getInquilinoId());

            if (documentoOld.isPresent() && propietario.isPresent() && inquilino.isPresent()) {

                Documentos documentoExistente = documentoOld.get();
                documentoExistente.setTipoDocumento("contrato");
                documentoExistente.setDocumento(arriendosDTO.getDocumento());
                documentoExistente.setArriendo(arriendoExistente);
                documentosRepositorio.save(documentoExistente);

                // propietario
                Usuarios usuarioExistente = propietario.get();
                usuarioExistente.setTipoUsuario("propietario");
                usuarioExistente.setTelefono(arriendosDTO.getTelefonoPropietario());
                usuarioExistente.setCedula(arriendosDTO.getCedulaPropietario());
                usuarioExistente.setNombre(arriendosDTO.getNombreUsuarioPropietario());
                usuariosRepositorio.save(usuarioExistente);

                // inquilino
                Usuarios usuarioExistente2 = inquilino.get();
                usuarioExistente2.setTipoUsuario("inquilino");
                usuarioExistente2.setTelefono(arriendosDTO.getTelefonoInquilino());
                usuarioExistente2.setCedula(arriendosDTO.getCedulaInquilino());
                usuarioExistente2.setNombre(arriendosDTO.getNombreUsuarioInquilino());
                usuariosRepositorio.save(usuarioExistente2);
            }
            arriendoRepositorio.save(arriendoExistente);
        }
        return "Arriendo y documentos actualizados con éxito.";
    }


    public String eliminarArriendo(Long id) {

        Optional<Arriendos> arriendoOptional = arriendoRepositorio.findById(id);

        if (arriendoOptional.isEmpty()) {
            return "Arriendo no encontrado.";
        }

        Arriendos arriendo = arriendoOptional.get();


        // Obtener los usuarios asociados (inquilino y propietario)
        Usuarios usuarioInquilino = arriendo.getUsuarioInquilino();
        Usuarios usuarioPropietario = arriendo.getUsuarioPropietario();

        // Eliminar el arriendo
        arriendoRepositorio.deleteById(id);

        // Verificar y eliminar al inquilino si no tiene otros arriendos
        if (usuarioInquilino != null && arriendoRepositorio.countByUsuarioInquilino(usuarioInquilino) == 0){
            usuariosRepositorio.deleteById(usuarioInquilino.getId());
        }

        // Verificar y eliminar al propietario si no tiene otros arriendos
        if (usuarioPropietario != null && arriendoRepositorio.countByUsuarioPropietario(usuarioPropietario) == 0) {
            usuariosRepositorio.deleteById(usuarioPropietario.getId());
        }

        return "Arriendo y usuarios eliminados con éxito.";
    }
}

