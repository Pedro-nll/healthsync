package com.pedroNll.HealthSync.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pedroNll.HealthSync.models.Cliente;
import com.pedroNll.HealthSync.models.Pessoa;
import com.pedroNll.HealthSync.models.Pessoa.createPessoa;
import com.pedroNll.HealthSync.services.ClienteServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/cliente")
@Validated
public class ClienteController {
    @Autowired
    private ClienteServices clienteService;

    @PostMapping
    @Validated(createPessoa.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Pessoa obj){
        this.clienteService.createPessoa(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").
        buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<Cliente> findById(@PathVariable Long id){
        Cliente obj = this.clienteService.findById(id); 
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<Cliente> findByUsername(@PathVariable String username){
        Cliente obj = this.clienteService.findByUsername(username);
        return ResponseEntity.ok().body(obj);
    }

    @PutMapping("/dadosGerais/{username}")
    public ResponseEntity<Void> createDadosGerais(@RequestBody Cliente obj, @PathVariable String username) {
        this.clienteService.createDadosGerais(obj);
        return ResponseEntity.noContent().build();
    }
}