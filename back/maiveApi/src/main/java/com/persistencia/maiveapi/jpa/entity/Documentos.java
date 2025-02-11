package com.persistencia.maiveapi.jpa.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "documentos")
public class Documentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincremental
    private Long id;

    @Column(name = "arriendo_id", nullable = false, updatable = false, insertable = false)
    @JsonIgnore
    private Long arriendoId;

    @Column(name = "tipo_documento", nullable = false)
    private String tipoDocumento;

    @Column(name = "documento", nullable = false)
    private String documento;

    @ManyToOne
    @JoinColumn(name = "arriendo_id", nullable = false)
    @JsonIgnoreProperties("documentosArriendo")
    private Arriendos arriendo;


    public Documentos() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getArriendoId() {
        return arriendoId;
    }

    public void setArriendoId(Long arriendoId) {
        this.arriendoId = arriendoId;
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

    public Arriendos getArriendo() {
        return arriendo;
    }

    public void setArriendo(Arriendos arriendo) {
        this.arriendo = arriendo;
    }
}
