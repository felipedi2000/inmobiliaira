package com.persistencia.maiveapi.jpa.repository;

import com.persistencia.maiveapi.jpa.entity.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdministradorRepositorio extends JpaRepository<Administrador, Long> {
    Optional<Administrador> findByCorreo(String email);
}
