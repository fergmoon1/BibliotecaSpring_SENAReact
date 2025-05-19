package edu.sena.bibliotecaspring.controller;

import edu.sena.bibliotecaspring.model.DVD;
import edu.sena.bibliotecaspring.service.DVDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/dvds")
public class DVDController {

    @Autowired
    private DVDService dvdService;

    @GetMapping
    public String listarDVDs(Model model) {
        model.addAttribute("dvds", dvdService.findAll());
        return "dvds/lista";
    }

    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("dvd", new DVD());
        return "dvds/formulario";
    }

    @PostMapping("/guardar")
    public String guardarDVD(@ModelAttribute DVD dvd) {
        dvdService.save(dvd);
        return "redirect:/dvds";
    }

    @GetMapping("/editar/{id}")
    public String mostrarFormularioEditar(@PathVariable Long id, Model model) {
        model.addAttribute("dvd", dvdService.findById(id));
        return "dvds/formulario";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarDVD(@PathVariable Long id) {
        dvdService.deleteById(id);
        return "redirect:/dvds";
    }

    @GetMapping("/buscar")
    public String buscarPorGenero(@RequestParam(required = false) String genero,
                                 @RequestParam(required = false) String director,
                                 Model model) {
        if (genero != null && !genero.isEmpty()) {
            model.addAttribute("dvds", dvdService.findByGenero(genero));
        } else if (director != null && !director.isEmpty()) {
            model.addAttribute("dvds", dvdService.findByDirector(director));
        } else {
            model.addAttribute("dvds", dvdService.findAll());
        }
        return "dvds/lista";
    }
}
