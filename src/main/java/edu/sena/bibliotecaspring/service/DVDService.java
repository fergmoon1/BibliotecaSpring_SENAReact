package edu.sena.bibliotecaspring.service;

import edu.sena.bibliotecaspring.model.DVD;
import edu.sena.bibliotecaspring.repository.DVDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DVDService {

    @Autowired
    private DVDRepository dvdRepository;

    public List<DVD> findAll() {
        return dvdRepository.findAll();
    }

    public DVD findById(Long id) {
        return dvdRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DVD no encontrado con id: " + id));
    }

    public DVD save(DVD dvd) {
        return dvdRepository.save(dvd);
    }

    public void deleteById(Long id) {
        dvdRepository.deleteById(id);
    }

    public List<DVD> findByGenero(String genero) {
        return dvdRepository.findByGeneroContaining(genero);
    }

    public List<DVD> findByDirector(String director) {
        return dvdRepository.findByDirectorContaining(director);
    }
}