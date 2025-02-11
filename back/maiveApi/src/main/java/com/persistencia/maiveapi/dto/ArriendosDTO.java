package com.persistencia.maiveapi.dto;


import java.time.LocalDate;

public class ArriendosDTO {

    private String direccion;

    private String tipoInmueble;

    private String barrio;

    private int cuentaAgua;

    private int cuentaLuz;

    private int cuentaGas;

    private LocalDate fechaIni;

    private LocalDate fechaFin;

    private String informacionExtra;

    // usuario arriendo arrendatario
    private String nombreUsuarioInquilino;

    private String cedulaInquilino;

    private String telefonoInquilino;

    // usuario arriendo propietario

    private String nombreUsuarioPropietario;

    private String cedulaPropietario;

    private String telefonoPropietario;

    // DATROS DOCUMENTO

    private long idDocumento;

    private String tipoDocumento;


    private String documento;


    public ArriendosDTO() {
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTipoInmueble() {
        return tipoInmueble;
    }

    public void setTipoInmueble(String tipoInmueble) {
        this.tipoInmueble = tipoInmueble;
    }

    public String getBarrio() {
        return barrio;
    }

    public void setBarrio(String barrio) {
        this.barrio = barrio;
    }

    public int getCuentaAgua() {
        return cuentaAgua;
    }

    public void setCuentaAgua(int cuentaAgua) {
        this.cuentaAgua = cuentaAgua;
    }

    public int getCuentaLuz() {
        return cuentaLuz;
    }

    public void setCuentaLuz(int cuentaLuz) {
        this.cuentaLuz = cuentaLuz;
    }

    public int getCuentaGas() {
        return cuentaGas;
    }

    public void setCuentaGas(int cuentaGas) {
        this.cuentaGas = cuentaGas;
    }

    public LocalDate getFechaIni() {
        return fechaIni;
    }

    public void setFechaIni(LocalDate fechaIni) {
        this.fechaIni = fechaIni;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getInformacionExtra() {
        return informacionExtra;
    }

    public void setInformacionExtra(String informacionExtra) {
        this.informacionExtra = informacionExtra;
    }

    public String getNombreUsuarioInquilino() {
        return nombreUsuarioInquilino;
    }

    public void setNombreUsuarioInquilino(String nombreUsuarioInquilino) {
        this.nombreUsuarioInquilino = nombreUsuarioInquilino;
    }

    public String getCedulaInquilino() {
        return cedulaInquilino;
    }

    public void setCedulaInquilino(String cedulaInquilino) {
        this.cedulaInquilino = cedulaInquilino;
    }

    public String getTelefonoInquilino() {
        return telefonoInquilino;
    }

    public void setTelefonoInquilino(String telefonoInquilino) {
        this.telefonoInquilino = telefonoInquilino;
    }

    public String getNombreUsuarioPropietario() {
        return nombreUsuarioPropietario;
    }

    public void setNombreUsuarioPropietario(String nombreUsuarioPropietario) {
        this.nombreUsuarioPropietario = nombreUsuarioPropietario;
    }

    public String getCedulaPropietario() {
        return cedulaPropietario;
    }

    public void setCedulaPropietario(String cedulaPropietario) {
        this.cedulaPropietario = cedulaPropietario;
    }

    public String getTelefonoPropietario() {
        return telefonoPropietario;
    }

    public void setTelefonoPropietario(String telefonoPropietario) {
        this.telefonoPropietario = telefonoPropietario;
    }

    public long getIdDocumento() {
        return idDocumento;
    }

    public void setIdDocumento(long idDocumento) {
        this.idDocumento = idDocumento;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }
}

