package com.persistencia.maiveapi.controller;

import com.persistencia.maiveapi.dto.ArriendosDTO;
import com.persistencia.maiveapi.jpa.entity.Arriendos;
import com.persistencia.maiveapi.service.ArriendosServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/arriendos")
public class ArriendosControlador {

    @Autowired
    private ArriendosServicio arriendoServicio;

    @GetMapping
    public ResponseEntity<List<Arriendos>> listarTodosArriendos() {
        List<Arriendos> arriendos = arriendoServicio.listarArriendos();
        if(arriendos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(arriendos, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<String> guardarArriendoCompleto(@RequestBody ArriendosDTO arriendosDTO) {
        try {
            String response = arriendoServicio.guardarArriendosCompleto(arriendosDTO);

            if ("Guardado correctamente".equals(response)) {
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error interno al guardar el arriendo.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizarArriendoCompleto(@PathVariable long id, @RequestBody ArriendosDTO arriendosDTO) {
        String response = arriendoServicio.actualizarArriendo(id, arriendosDTO);

        if(response.equals("Arriendo no encontrado")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else{
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarArriendoCompleto(@PathVariable long id) {
        String response = arriendoServicio.eliminarArriendo(id);
        if(response.equals("Arriendo no encontrado")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }
}
