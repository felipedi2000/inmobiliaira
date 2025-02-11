package com.persistencia.maiveapi.service;

import com.persistencia.maiveapi.jpa.entity.Documentos;
import com.persistencia.maiveapi.jpa.repository.DocumentosRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentosServicio {

    @Autowired
    private DocumentosRepositorio documentosRepositorio;

    public List<Documentos> listarDocumentosArriendo(long idArriendo) {
        return documentosRepositorio.findByArriendoId(idArriendo);
    }
}
