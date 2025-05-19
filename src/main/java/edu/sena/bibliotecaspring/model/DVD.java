package edu.sena.bibliotecaspring.model;

import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
public class DVD extends ElementoBiblioteca {
    private String director;
    private String genero;
    private int duracion;

    public DVD() {
    }

    public DVD(String titulo, LocalDate fechaPublicacion, String director, String genero, int duracion) {
        super(titulo, fechaPublicacion);
        this.director = director;
        this.genero = genero;
        this.duracion = duracion;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }
}
