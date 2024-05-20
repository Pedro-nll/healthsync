package com.pedroNll.HealthSync.controllers;

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

import com.pedroNll.HealthSync.models.ProgessaoEFeedback;
import com.pedroNll.HealthSync.services.ProgressaoService;

@RestController
@RequestMapping("/progressao")
public class ProgessaoController {
    @Autowired
    private ProgressaoService progessaoService;

    @PostMapping
    public ResponseEntity<ProgessaoEFeedback> postPeso(@RequestBody ProgessaoEFeedback pf){
        return ResponseEntity.ok().body(this.progessaoService.postPeso(pf));
    }

    @PutMapping
    public ResponseEntity<ProgessaoEFeedback> putPeso(@RequestBody ProgessaoEFeedback pf){
        return ResponseEntity.ok().body(this.progessaoService.atualizarPeso(pf));
    }

    @GetMapping("{id}")
    public ResponseEntity<List<ProgessaoEFeedback>> getAllPesos(@PathVariable Long id){
        List<ProgessaoEFeedback> pfs = this.progessaoService.findAllByCliente(id);
        return ResponseEntity.ok().body(pfs);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProgessaoEFeedback>> getAll(){
        return ResponseEntity.ok().body(this.progessaoService.getAll());
    }


}
