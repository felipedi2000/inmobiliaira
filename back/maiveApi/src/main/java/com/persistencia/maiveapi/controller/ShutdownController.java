package com.persistencia.maiveapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ShutdownController {

    private final ServletWebServerApplicationContext context;

    @Autowired
    public ShutdownController(ServletWebServerApplicationContext context) {
        this.context = context;
    }

    @PostMapping("/shutdown")
    public void shutdown() {
        System.out.println("⚠️  Apagando Spring Boot porque el navegador se cerró...");
        new Thread(() -> {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            SpringApplication.exit(context, () -> 0);
        }).start();
    }
}
