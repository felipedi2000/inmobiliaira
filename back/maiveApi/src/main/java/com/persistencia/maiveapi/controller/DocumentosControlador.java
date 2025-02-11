package com.persistencia.maiveapi.controller;

import com.persistencia.maiveapi.jpa.entity.Documentos;
import com.persistencia.maiveapi.service.DocumentosServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/documentos")
public class DocumentosControlador {

    @Autowired
    private DocumentosServicio documentosServicio;

    @GetMapping("/arriendo/{idArriendo}")
    public ResponseEntity<List<Documentos>> listarDocumentosArriendo(@PathVariable long idArriendo) {
        List<Documentos> documentos = documentosServicio.listarDocumentosArriendo(idArriendo);

        if(documentos == null){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(documentos);
        }
    }
}
