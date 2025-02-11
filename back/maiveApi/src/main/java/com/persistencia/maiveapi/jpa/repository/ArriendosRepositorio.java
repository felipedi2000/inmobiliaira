package com.persistencia.maiveapi.jpa.repository;

import com.persistencia.maiveapi.jpa.entity.Arriendos;
import com.persistencia.maiveapi.jpa.entity.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ArriendosRepositorio extends JpaRepository<Arriendos, Long> {

    long countByUsuarioInquilino(Usuarios usuarioInquilino);

    long countByUsuarioPropietario(Usuarios usuarioPropietario);

    @Query("SELECT a FROM Arriendos a LEFT JOIN FETCH a.documentosArriendo")
    List<Arriendos> findAllWithDocuments();

    Optional<Arriendos> findById(Long id);
}
