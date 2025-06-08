package edu.sena.bibliotecaspring.repository;

import edu.sena.bibliotecaspring.model.DVD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DVDRepository extends JpaRepository<DVD, Long> {
    List<DVD> findByGeneroContaining(String genero);
    List<DVD> findByDirectorContaining(String director);
}