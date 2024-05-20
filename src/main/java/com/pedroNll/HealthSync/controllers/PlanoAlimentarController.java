package com.pedroNll.HealthSync.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pedroNll.HealthSync.models.PlanoAlimentar;
import com.pedroNll.HealthSync.services.PlanoAlimentarServices;

@RestController
@RequestMapping("/planoAlimentar")
public class PlanoAlimentarController {
    @Autowired
    private PlanoAlimentarServices planoAlimentarService;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody PlanoAlimentar obj){
        this.planoAlimentarService.createPlanoAlimentar(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").
        buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/cliente/{Id}")
    public ResponseEntity<PlanoAlimentar> findByClienteId(@PathVariable Long Id){
        PlanoAlimentar obj = this.planoAlimentarService.findByClienteId(Id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/nutricionista/{Id}")
    public ResponseEntity<List<PlanoAlimentar>> findAllByNutricionistaId(@PathVariable Long Id){
        List<PlanoAlimentar> obj = this.planoAlimentarService.findAllByNutricionistaId(Id);
        return ResponseEntity.ok().body(obj); 
    }

    @GetMapping("/nullNutricionista")
    public ResponseEntity<List<PlanoAlimentar>> findAllByNutricionistaIsNull(){
        List<PlanoAlimentar> obj = this.planoAlimentarService.findAllByNutricionistaIsNull();
        return ResponseEntity.ok().body(obj); 
    }

    @GetMapping("/rejeitadoNutricionista")
    public ResponseEntity<List<PlanoAlimentar>> findAllByRejeitado(){
        List<PlanoAlimentar> obj = this.planoAlimentarService.findAllByRejeitado();
        return ResponseEntity.ok().body(obj);
    }

    @PutMapping("/enviarPlano")
    public ResponseEntity<Void> enviarPlano(@RequestBody PlanoAlimentar obj){
        this.planoAlimentarService.enviarPlanoAlimentar(obj);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/avaliarPlano")
    public ResponseEntity<Void> avaliarPlano(@RequestBody PlanoAlimentar obj){
        this.planoAlimentarService.avaliarPlanoAlimentar(obj);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/pedirNovoPlano")
    public ResponseEntity<Void> pedirNovoPlano(@RequestBody PlanoAlimentar obj){
        this.planoAlimentarService.pedirNovoPlano(obj);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlanoAlimentar>> getAllPlanos(){
        return ResponseEntity.ok().body(this.planoAlimentarService.getAllPlanos());
    }
}
