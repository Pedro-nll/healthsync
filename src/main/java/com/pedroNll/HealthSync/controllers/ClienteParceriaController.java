package com.pedroNll.HealthSync.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedroNll.HealthSync.models.ClienteParceria;
import com.pedroNll.HealthSync.services.ClienteParceriaService;

@RestController
@RequestMapping("/clienteParceria")
public class ClienteParceriaController {
    @Autowired
    ClienteParceriaService clienteParceriaService;

    @PostMapping
    public ResponseEntity<ClienteParceria> create(@RequestBody CPRequest obj){
        return ResponseEntity.ok().body(this.clienteParceriaService.create(obj));
    }

    @GetMapping("/nullNutri")
    public ResponseEntity<List<ClienteParceria>> getByNullNutri(){
        return ResponseEntity.ok().body(this.clienteParceriaService.findByNullNutri());
    }

    @GetMapping("{id}")
    public ResponseEntity<ClienteParceria> getClienteParceriaById(@PathVariable Long id){
        Optional<ClienteParceria> cp = this.clienteParceriaService.findById(id);
        if(cp.isPresent()){
            return ResponseEntity.ok().body(cp.get());
        }else{    
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/cliente/{cliente_id}")
    public ResponseEntity<List<ClienteParceria>> getParceriasByClienteId(@PathVariable Long cliente_id){
        return ResponseEntity.ok().body(this.clienteParceriaService.findParceriasByClienteId(cliente_id));
    }

    @PutMapping
    public ResponseEntity<ClienteParceria> atualizarClienteParceria(@RequestBody ClienteParceria obj){
        return ResponseEntity.ok().body(this.clienteParceriaService.atualizarClienteParceria(obj));
    }
}
