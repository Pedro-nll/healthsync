package com.pedroNll.HealthSync.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pedroNll.HealthSync.models.ProfissionalExercicio;
import com.pedroNll.HealthSync.models.Pessoa.createPessoa;
import com.pedroNll.HealthSync.services.ProfissionalExercicioServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/profissional")
public class ProfissionalExercicioController {
    @Autowired
    private ProfissionalExercicioServices profissionalExercicioService;

    @PostMapping
    @Validated(createPessoa.class)
    public ResponseEntity<Void> create(@Valid @RequestBody ProfissionalExercicio obj){
        this.profissionalExercicioService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").
        buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<ProfissionalExercicio> findByUsername(@PathVariable String username){
        ProfissionalExercicio obj = this.profissionalExercicioService.findByUsername(username);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProfissionalExercicio> findById(@PathVariable Long id){
        ProfissionalExercicio obj = this.profissionalExercicioService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    
}
