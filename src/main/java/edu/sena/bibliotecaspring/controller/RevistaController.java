package edu.sena.bibliotecaspring.controller;

import edu.sena.bibliotecaspring.model.Revista;
import edu.sena.bibliotecaspring.service.RevistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revistas")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class RevistaController {

    @Autowired
    private RevistaService revistaService;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Revista>> getAllRevistas() {
        try {
            List<Revista> revistas = revistaService.findAll();
            if (revistas.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(revistas);
        } catch (Exception e) {
            System.out.println("Error en getAllRevistas: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Revista> getRevistaById(@PathVariable Long id) {
        try {
            Revista revista = revistaService.findById(id);
            if (revista == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(revista);
        } catch (Exception e) {
            System.out.println("Error en getRevistaById: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Revista> crearRevista(@RequestBody Revista revista) {
        try {
            Revista savedRevista = revistaService.save(revista);
            return ResponseEntity.status(201).body(savedRevista);
        } catch (Exception e) {
            System.out.println("Error en crearRevista: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Revista> actualizarRevista(@PathVariable Long id, @RequestBody Revista revista) {
        try {
            Revista existingRevista = revistaService.findById(id);
            if (existingRevista == null) {
                return ResponseEntity.notFound().build();
            }
            revista.setId(id);
            Revista updatedRevista = revistaService.save(revista);
            return ResponseEntity.ok(updatedRevista);
        } catch (Exception e) {
            System.out.println("Error en actualizarRevista: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> eliminarRevista(@PathVariable Long id) {
        try {
            Revista revista = revistaService.findById(id);
            if (revista == null) {
                return ResponseEntity.notFound().build();
            }
            revistaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.out.println("Error en eliminarRevista: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/buscar", produces = "application/json")
    public ResponseEntity<List<Revista>> buscarPorCategoriaOEditorial(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String editorial) {
        try {
            List<Revista> revistas;
            if (categoria != null && !categoria.isEmpty()) {
                revistas = revistaService.findByCategoria(categoria);
            } else if (editorial != null && !editorial.isEmpty()) {
                revistas = revistaService.findByEditorial(editorial);
            } else {
                revistas = revistaService.findAll();
            }
            if (revistas.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(revistas);
        } catch (Exception e) {
            System.out.println("Error en buscarPorCategoriaOEditorial: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }
}