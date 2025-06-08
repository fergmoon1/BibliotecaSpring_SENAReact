package edu.sena.bibliotecaspring.controller.thymeleaf;

import edu.sena.bibliotecaspring.model.Revista;
import edu.sena.bibliotecaspring.service.RevistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/revistas")
public class RevistaControllerThymeleaf {

    @Autowired
    private RevistaService revistaService;

    @GetMapping
    public String listarRevistas(Model model) {
        model.addAttribute("revistas", revistaService.findAll());
        return "revistas/lista";
    }

    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("revista", new Revista());
        return "revistas/formulario";
    }

    @PostMapping("/guardar")
    public String guardarRevista(@ModelAttribute Revista revista) {
        revistaService.save(revista);
        return "redirect:/revistas";
    }

    @GetMapping("/editar/{id}")
    public String mostrarFormularioEditar(@PathVariable Long id, Model model) {
        model.addAttribute("revista", revistaService.findById(id));
        return "revistas/formulario";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarRevista(@PathVariable Long id) {
        revistaService.deleteById(id);
        return "redirect:/revistas";
    }

    @GetMapping("/buscar")
    public String buscarPorCategoria(@RequestParam(required = false) String categoria,
                                    @RequestParam(required = false) String editorial,
                                    Model model) {
        if (categoria != null && !categoria.isEmpty()) {
            model.addAttribute("revistas", revistaService.findByCategoria(categoria));
        } else if (editorial != null && !editorial.isEmpty()) {
            model.addAttribute("revistas", revistaService.findByEditorial(editorial));
        } else {
            model.addAttribute("revistas", revistaService.findAll());
        }
        return "revistas/lista";
    }
}
