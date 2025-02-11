package com.persistencia.maiveapi.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "cedula")
    private String cedula;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "tipo_usuario")
    private String tipoUsuario;

    @OneToMany(mappedBy = "usuarioInquilino")
    @JsonIgnore
    private List<Arriendos> arrendamentosInquilino;

    @OneToMany(mappedBy = "usuarioPropietario")
    @JsonIgnore
    private List<Arriendos> arrendamentosPropietario;

    public Usuarios() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public List<Arriendos> getArrendamentosInquilino() {
        return arrendamentosInquilino;
    }

    public void setArrendamentosInquilino(List<Arriendos> arrendamentosInquilino) {
        this.arrendamentosInquilino = arrendamentosInquilino;
    }

    public List<Arriendos> getArrendamentosPropietario() {
        return arrendamentosPropietario;
    }

    public void setArrendamentosPropietario(List<Arriendos> arrendamentosPropietario) {
        this.arrendamentosPropietario = arrendamentosPropietario;
    }
}
