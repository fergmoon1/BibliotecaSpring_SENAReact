package edu.sena.bibliotecaspring.controller;

import edu.sena.bibliotecaspring.model.Libro;
import edu.sena.bibliotecaspring.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:3000")
public class LibroTestController {

    @Autowired
    private LibroService libroService;

    // GET /api/libros - Obtener todos los libros
    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Libro>> getAllLibros() {
        try {
            List<Libro> libros = libroService.findAll();
            if (libros.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(libros);
        } catch (Exception e) {
            System.out.println("Error en getAllLibros: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    // GET /api/libros/{id} - Obtener un libro por ID
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Libro> getLibroById(@PathVariable Long id) {
        try {
            Libro libro = libroService.findById(id);
            if (libro == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(libro);
        } catch (Exception e) {
            System.out.println("Error en getLibroById: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    // POST /api/libros - Crear un nuevo libro
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Libro> crearLibro(@RequestBody Libro libro) {
        try {
            Libro savedLibro = libroService.save(libro);
            return ResponseEntity.status(201).body(savedLibro);
        } catch (Exception e) {
            System.out.println("Error en crearLibro: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    // PUT /api/libros/{id} - Actualizar un libro
    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable Long id, @RequestBody Libro libro) {
        try {
            Libro existingLibro = libroService.findById(id);
            if (existingLibro == null) {
                return ResponseEntity.notFound().build();
            }
            libro.setId(id);
            Libro updatedLibro = libroService.save(libro);
            return ResponseEntity.ok(updatedLibro);
        } catch (Exception e) {
            System.out.println("Error en actualizarLibro: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    // DELETE /api/libros/{id} - Eliminar un libro
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        try {
            Libro libro = libroService.findById(id);
            if (libro == null) {
                return ResponseEntity.notFound().build();
            }
            libroService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.out.println("Error en eliminarLibro: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}