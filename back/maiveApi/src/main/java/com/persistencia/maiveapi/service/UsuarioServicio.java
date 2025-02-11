package com.persistencia.maiveapi.service;

import com.persistencia.maiveapi.jpa.entity.Arriendos;
import com.persistencia.maiveapi.jpa.entity.Usuarios;
import com.persistencia.maiveapi.jpa.repository.ArriendosRepositorio;
import com.persistencia.maiveapi.jpa.repository.UsuariosRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UsuarioServicio {

    @Autowired
    UsuariosRepositorio usuariosRepositorio;


    public List<Usuarios> listarUsuarios() {
        return usuariosRepositorio.findAll();
    }

    public String actualizarUsuario(Usuarios usuario) {
        Optional<Usuarios> usuarioOldOptional = usuariosRepositorio.findById(usuario.getId());

        if (usuarioOldOptional.isPresent()) {
            Usuarios usuarioOld = usuarioOldOptional.get();

            Optional<Usuarios> usuarioConMismaCedula = usuariosRepositorio.findByCedula(usuario.getCedula());
            if (usuarioConMismaCedula.isPresent() &&
                    !Objects.equals(usuarioConMismaCedula.get().getId(), usuarioOld.getId())) {
                return "Error al actualizar: Cédula ya registrada";
            }

            // Verificar si los datos son los mismos
            if (usuarioOld.getNombre().equals(usuario.getNombre()) &&
                    usuarioOld.getCedula().equals(usuario.getCedula()) &&
                    usuarioOld.getTelefono().equals(usuario.getTelefono())) {
                return "Usuario actualizado con mismos datos";
            }
            // Actualizar los datos
            usuarioOld.setNombre(usuario.getNombre());
            usuarioOld.setCedula(usuario.getCedula());
            usuarioOld.setTelefono(usuario.getTelefono());

            usuariosRepositorio.save(usuarioOld);

            return "Usuario actualizado con éxito";
        } else {
            return "Usuario no encontrado";
        }
    }

}
