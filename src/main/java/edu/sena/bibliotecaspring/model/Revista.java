package edu.sena.bibliotecaspring.model;

import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
public class Revista extends ElementoBiblioteca {
    private String categoria;
    private int numero;
    private String editorial;

    public Revista() {
    }

    public Revista(String titulo, LocalDate fechaPublicacion, String categoria, int numero, String editorial) {
        super(titulo, fechaPublicacion);
        this.categoria = categoria;
        this.numero = numero;
        this.editorial = editorial;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }
}
