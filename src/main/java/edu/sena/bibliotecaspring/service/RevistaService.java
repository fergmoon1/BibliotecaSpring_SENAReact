package edu.sena.bibliotecaspring.service;

import edu.sena.bibliotecaspring.model.Revista;
import edu.sena.bibliotecaspring.repository.RevistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevistaService {

    @Autowired
    private RevistaRepository revistaRepository;

    public List<Revista> findAll() {
        return revistaRepository.findAll();
    }

    public Revista findById(Long id) {
        return revistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Revista no encontrada con id: " + id));
    }

    public Revista save(Revista revista) {
        return revistaRepository.save(revista);
    }

    public void deleteById(Long id) {
        revistaRepository.deleteById(id);
    }

    public List<Revista> findByCategoria(String categoria) {
        return revistaRepository.findByCategoriaContaining(categoria);
    }

    public List<Revista> findByEditorial(String editorial) {
        return revistaRepository.findByEditorialContaining(editorial);
    }
}