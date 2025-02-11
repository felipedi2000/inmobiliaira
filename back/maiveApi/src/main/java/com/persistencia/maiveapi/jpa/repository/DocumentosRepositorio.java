package com.persistencia.maiveapi.jpa.repository;

import com.persistencia.maiveapi.jpa.entity.Documentos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentosRepositorio extends JpaRepository<Documentos, Long> {
    List<Documentos> findByArriendoId(Long arriendoId);
}
