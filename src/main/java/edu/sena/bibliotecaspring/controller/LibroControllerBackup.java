package edu.sena.bibliotecaspring.controller;

import edu.sena.bibliotecaspring.model.Libro;
import edu.sena.bibliotecaspring.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/libros")
public class LibroControllerBackup {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public String listarLibros(Model model) {
        model.addAttribute("libros", libroService.findAll());
        return "libros/lista";
    }

    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("libro", new Libro());
        return "libros/formulario";
    }

    @PostMapping("/guardar")
    public String guardarLibro(@ModelAttribute Libro libro) {
        libroService.save(libro);
        return "redirect:/libros";
    }

    @GetMapping("/editar/{id}")
    public String mostrarFormularioEditar(@PathVariable Long id, Model model) {
        model.addAttribute("libro", libroService.findById(id));
        return "libros/formulario";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarLibro(@PathVariable Long id) {
        libroService.deleteById(id);
        return "redirect:/libros";
    }

    @GetMapping("/buscar")
    public String buscarPorTitulo(@RequestParam(required = false) String titulo, 
                                 @RequestParam(required = false) String autor,
                                 Model model) {
        if (titulo != null && !titulo.isEmpty()) {
            model.addAttribute("libros", libroService.findByTitulo(titulo));
        } else if (autor != null && !autor.isEmpty()) {
            model.addAttribute("libros", libroService.findByAutor(autor));
        } else {
            model.addAttribute("libros", libroService.findAll());
        }
        return "libros/lista";
    }
}
