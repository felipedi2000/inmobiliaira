package com.persistencia.maiveapi.jpa.repository;

import com.persistencia.maiveapi.jpa.entity.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuariosRepositorio extends JpaRepository<Usuarios, Long> {

    Optional<Usuarios> findByCedula(String cedula);

}
