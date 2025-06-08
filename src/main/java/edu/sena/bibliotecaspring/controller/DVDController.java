package edu.sena.bibliotecaspring.controller;

import edu.sena.bibliotecaspring.model.DVD;
import edu.sena.bibliotecaspring.service.DVDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dvds")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class DVDController {

    @Autowired
    private DVDService dvdService;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<DVD>> getAllDVDs() {
        try {
            List<DVD> dvds = dvdService.findAll();
            if (dvds.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(dvds);
        } catch (Exception e) {
            System.out.println("Error en getAllDVDs: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<DVD> getDVDById(@PathVariable Long id) {
        try {
            DVD dvd = dvdService.findById(id);
            if (dvd == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(dvd);
        } catch (Exception e) {
            System.out.println("Error en getDVDById: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<DVD> crearDVD(@RequestBody DVD dvd) {
        try {
            DVD savedDVD = dvdService.save(dvd);
            return ResponseEntity.status(201).body(savedDVD);
        } catch (Exception e) {
            System.out.println("Error en crearDVD: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<DVD> actualizarDVD(@PathVariable Long id, @RequestBody DVD dvd) {
        try {
            DVD existingDVD = dvdService.findById(id);
            if (existingDVD == null) {
                return ResponseEntity.notFound().build();
            }
            dvd.setId(id);
            DVD updatedDVD = dvdService.save(dvd);
            return ResponseEntity.ok(updatedDVD);
        } catch (Exception e) {
            System.out.println("Error en actualizarDVD: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> eliminarDVD(@PathVariable Long id) {
        try {
            DVD dvd = dvdService.findById(id);
            if (dvd == null) {
                return ResponseEntity.notFound().build();
            }
            dvdService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.out.println("Error en eliminarDVD: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/buscar", produces = "application/json")
    public ResponseEntity<List<DVD>> buscarPorGeneroODirector(
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) String director) {
        try {
            List<DVD> dvds;
            if (genero != null && !genero.isEmpty()) {
                dvds = dvdService.findByGenero(genero);
            } else if (director != null && !director.isEmpty()) {
                dvds = dvdService.findByDirector(director);
            } else {
                dvds = dvdService.findAll();
            }
            if (dvds.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(dvds);
        } catch (Exception e) {
            System.out.println("Error en buscarPorGeneroODirector: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }
}