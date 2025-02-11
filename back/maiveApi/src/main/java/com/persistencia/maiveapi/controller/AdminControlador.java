package com.persistencia.maiveapi.controller;

import com.persistencia.maiveapi.service.AdministradorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminControlador {

    @Autowired
    private AdministradorServicio administradorServicio;

    @PostMapping("/login")
    public String computateLogin(@RequestParam String username, @RequestParam String password) {
        if(administradorServicio.login(username, password)) {
            return "OK";
        } else {
            return "NOK";
        }
    }
}
