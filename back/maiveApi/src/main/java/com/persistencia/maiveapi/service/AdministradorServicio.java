package com.persistencia.maiveapi.service;

import com.persistencia.maiveapi.jpa.entity.Administrador;
import com.persistencia.maiveapi.jpa.repository.AdministradorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdministradorServicio {

    @Autowired
    private AdministradorRepositorio administradorRepositorio;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public boolean login(String email, String password) {
        Optional<Administrador> administrador = administradorRepositorio.findByCorreo(email);
        if(administrador.isPresent()) {
            Administrador admin = administrador.get();
            return bCryptPasswordEncoder.matches(password, admin.getClave());
        }
        return false;
    }
}
