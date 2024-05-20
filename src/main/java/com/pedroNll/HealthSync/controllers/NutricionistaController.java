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

import com.pedroNll.HealthSync.models.Nutricionista;
import com.pedroNll.HealthSync.models.Pessoa.createPessoa;
import com.pedroNll.HealthSync.services.NutricionistaServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/nutricionista")
@Validated
public class NutricionistaController {
    @Autowired
    private NutricionistaServices nutricionistaService;

    @PostMapping
    @Validated(createPessoa.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Nutricionista obj){
        this.nutricionistaService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").
        buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<Nutricionista> findById(@PathVariable Long id){
        Nutricionista obj = this.nutricionistaService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<Nutricionista> findByUsername(@PathVariable String username){
        Nutricionista obj = this.nutricionistaService.findByUsername(username);
        return ResponseEntity.ok().body(obj);
    }
}
