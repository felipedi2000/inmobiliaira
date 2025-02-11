package com.persistencia.maiveapi.dato;

public class DocumentosDTO {
    private Long idDocumento;
    private String tipoDocumento;
    private byte[] documento;  // O el tipo adecuado según lo que almacenes
    private String descripcionDcoumento;
    private String nombreDocumento;

    public DocumentosDTO() {
    }

    public Long getIdDocumento() {
        return idDocumento;
    }

    public void setIdDocumento(Long idDocumento) {
        this.idDocumento = idDocumento;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public byte[] getDocumento() {
        return documento;
    }

    public void setDocumento(byte[] documento) {
        this.documento = documento;
    }

    public String getDescripcionDcoumento() {
        return descripcionDcoumento;
    }

    public void setDescripcionDcoumento(String descripcionDcoumento) {
        this.descripcionDcoumento = descripcionDcoumento;
    }

    public String getNombreDocumento() {
        return nombreDocumento;
    }

    public void setNombreDocumento(String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
    }
}
