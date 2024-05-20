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

import com.pedroNll.HealthSync.models.PlanoExercicio;
import com.pedroNll.HealthSync.services.PlanoExercicioServices;

@RestController
@RequestMapping("/planoExercicio")
public class PlanoExercicioController {
    @Autowired
    private PlanoExercicioServices planoExercicioService;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody PlanoExercicio obj){
        this.planoExercicioService.createPlanoExercicio(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").
        buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/cliente/{Id}")
    public ResponseEntity<PlanoExercicio> findByClienteId(@PathVariable Long Id){
        PlanoExercicio obj = this.planoExercicioService.findByClienteId(Id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/nullProfissional")
    public ResponseEntity<List<PlanoExercicio>> findAllByProfissionalIsNull(){
        List<PlanoExercicio> obj = this.planoExercicioService.findAllByProfissionalIsNull();
        return ResponseEntity.ok().body(obj); 
    }

    @GetMapping("/rejeitadoProfissional")
    public ResponseEntity<List<PlanoExercicio>> findAllByRejeitado(){
        List<PlanoExercicio> obj = this.planoExercicioService.findAllByRejeitado();
        return ResponseEntity.ok().body(obj); 
    }

    @PutMapping("/enviarPlano")
    public ResponseEntity<Void> enviarPlano(@RequestBody PlanoExercicio obj){
        this.planoExercicioService.enviarPlanoExercicio(obj);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/avaliarPlano")
    public ResponseEntity<Void> avaliarPlano(@RequestBody PlanoExercicio obj){
        this.planoExercicioService.avaliarPlanoExercicio(obj);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/pedirNovoPlano")
    public ResponseEntity<Void> pedirNovoPlano(@RequestBody PlanoExercicio obj){
        this.planoExercicioService.pedirNovoPlano(obj);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlanoExercicio>> getAll(){
        return ResponseEntity.ok().body(this.planoExercicioService.getAll());
    }
}
