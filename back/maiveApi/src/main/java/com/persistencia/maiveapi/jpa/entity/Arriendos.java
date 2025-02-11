package com.persistencia.maiveapi.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "arrendamientos")
@Getter
@Setter
public class Arriendos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long idArriendo;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "tipo_inmueble", nullable = false)
    private String tipoInmueble;

    @Column(name = "barrio", nullable = false)
    private String barrio;

    @Column(name = "cuenta_agua", nullable = false)
    private int cuentaAgua;

    @Column(name = "cuenta_luz", nullable = false)
    private int cuentaLuz;

    @Column(name = "cuenta_gas", nullable = false)
    private int cuentaGas;

    @Column(name = "fecha_ini", nullable = false)
    private LocalDate fechaIni;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "inquilino_id", nullable = false, updatable = false, insertable = false)
    private long inquilinoId;

    @Column(name = "propietario_id", nullable = false, updatable = false, insertable = false)
    private long propietarioId;

    @Column(name = "informacion_extra", columnDefinition = "TEXT")
    private String informacionExtra;

    @ManyToOne
    @JoinColumn(name = "inquilino_id")
    private Usuarios usuarioInquilino;

    @ManyToOne
    @JoinColumn(name = "propietario_id")
    private Usuarios usuarioPropietario;

    @OneToMany(mappedBy = "arriendo")
    @JsonIgnoreProperties("arriendo")
    private List<Documentos> documentosArriendo;


    public Arriendos() {
    }

    public long getIdArriendo() {
        return idArriendo;
    }

    public void setIdArriendo(long idArriendo) {
        this.idArriendo = idArriendo;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
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

    public long getInquilinoId() {
        return inquilinoId;
    }

    public void setInquilinoId(long inquilinoId) {
        this.inquilinoId = inquilinoId;
    }

    public long getPropietarioId() {
        return propietarioId;
    }

    public void setPropietarioId(long propietarioId) {
        this.propietarioId = propietarioId;
    }

    public String getInformacionExtra() {
        return informacionExtra;
    }

    public void setInformacionExtra(String informacionExtra) {
        this.informacionExtra = informacionExtra;
    }

    public Usuarios getUsuarioInquilino() {
        return usuarioInquilino;
    }

    public void setUsuarioInquilino(Usuarios usuarioInquilino) {
        this.usuarioInquilino = usuarioInquilino;
    }

    public Usuarios getUsuarioPropietario() {
        return usuarioPropietario;
    }

    public void setUsuarioPropietario(Usuarios usuarioPropietario) {
        this.usuarioPropietario = usuarioPropietario;
    }

    public List<Documentos> getDocumentosArriendo() {
        return documentosArriendo;
    }

    public void setDocumentosArriendo(List<Documentos> documentosArriendo) {
        this.documentosArriendo = documentosArriendo;
    }
}
