package com.pedroNll.HealthSync.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedroNll.HealthSync.models.Parceria;
import com.pedroNll.HealthSync.services.ParceriaService;

@RestController
@RequestMapping("/parcerias")
public class ParceriaController {

    @Autowired
    private ParceriaService parceriaService;
    
    @GetMapping("/todasParcerias")
    public ResponseEntity<List<Parceria>> listarParcerias() {
        try {
            List<Parceria> parcerias = parceriaService.findAllParceria();
            if (parcerias.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(parcerias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Parceria> buscarParceriaPorId(@PathVariable Long id) {
        Parceria parceria = parceriaService.findById(id);
        return ResponseEntity.ok(parceria);
    }
    
    @PostMapping
    public ResponseEntity<Parceria> criarParceria(@RequestBody Parceria parceria) {
        Parceria novaParceria = parceriaService.create(parceria);
        return ResponseEntity.ok(novaParceria);
    }

    @GetMapping("/nutri/{id}")
    public ResponseEntity<List<Parceria>> getParceriasNutri(@PathVariable Long id){
        List<Parceria> parcerias = this.parceriaService.findByNutriId(id);
        return ResponseEntity.ok().body(parcerias);
    }

    @GetMapping("/pe/{id}")
    public ResponseEntity<List<Parceria>> getParceriasPE(@PathVariable Long id){
        List<Parceria> parcerias = this.parceriaService.findByPEId(id);
        return ResponseEntity.ok().body(parcerias);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Parceria> atualizarParceria(@PathVariable Long id, @RequestBody Parceria parceria) {
        parceria.setId(id);
        Parceria parceriaAtualizada = parceriaService.update(parceria);
        return ResponseEntity.ok(parceriaAtualizada);
    }
}