package com.persistencia.maiveapi.controller;


import com.persistencia.maiveapi.jpa.entity.Usuarios;
import com.persistencia.maiveapi.service.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/usuarios")
public class UsuariosControlador {

    @Autowired
    private UsuarioServicio usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuarios>> listarTodosArriendos() {
        List<Usuarios> usuarios = usuarioService.listarUsuarios();
        if(usuarios.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<String> guardarUsuario(@RequestBody Usuarios usuario) {
        String response = usuarioService.agregarUsuario(usuario);
        if(response.equals("Usuario registrado")){
            return new ResponseEntity<>(response,HttpStatus.OK);
        } else return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable("id") Long id, @RequestBody Usuarios usuario) {

        usuario.setId(id);

        String response = usuarioService.actualizarUsuario(usuario);

        if (response.equals("Usuario actualizado con éxito")) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable("id") Long id) {
        String response = usuarioService.eliminarUsuario(id) ;
        if (response.equals("eliminado")) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
