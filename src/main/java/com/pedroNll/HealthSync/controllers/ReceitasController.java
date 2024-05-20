package com.pedroNll.HealthSync.controllers;

import java.util.ArrayList;
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

import com.pedroNll.HealthSync.models.FullReceita;
import com.pedroNll.HealthSync.models.Receita;
import com.pedroNll.HealthSync.models.ReceitaReponse;
import com.pedroNll.HealthSync.services.ReceitasService;

@RestController
@RequestMapping("/receitas")
public class ReceitasController {
    @Autowired
    private ReceitasService receitasService;

    @PostMapping("/adicionarReceita")
    public ResponseEntity<Void> adicionarReceita(@RequestBody Receita obj){
        this.receitasService.adicionarReceita(obj);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nullAvaliador")
    public ResponseEntity<List<ReceitaReponse>> getReceitasComAvaliadorNull() {
        Optional<List<Receita>> rs = this.receitasService.getReceitasComAvaliadorNull();
        List<ReceitaReponse> receitaReponses = new ArrayList<>();
        List<Receita> receitas = new ArrayList<>();
        if(rs.isPresent()){
            receitas = rs.get();
        }
        for(Receita r : receitas){
            ReceitaReponse newObj = new ReceitaReponse();
            newObj.setId(r.getId());
            newObj.setNomeAutor(r.getPlanoAlimentar().getCliente().getUsername());
            newObj.setNomeReceita(r.getNomeDaReceita());
            newObj.setId_plano_alm(r.getPlanoAlimentar().getId());
            receitaReponses.add(newObj);
        }
        return ResponseEntity.ok().body(receitaReponses);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReceitaReponse> getReceita(@PathVariable Long id){
        Receita receita = this.receitasService.getReceitaById(id);
        if(receita == null){
            return ResponseEntity.notFound().build();
        }else{
            ReceitaReponse newObj = new ReceitaReponse();
            newObj.setId(receita.getId());
            newObj.setId_plano_alm(receita.getPlanoAlimentar().getId());
            newObj.setNomeAutor(receita.getPlanoAlimentar().getCliente().getUsername());
            newObj.setNomeReceita(receita.getNomeDaReceita());
            return ResponseEntity.ok().body(newObj);
        }
    }

    @GetMapping("/full/{id}")
    public ResponseEntity<FullReceita> getFullReceita(@PathVariable Long id){
        Receita receita = this.receitasService.getReceitaById(id);
        if(receita == null){
            return ResponseEntity.notFound().build();
        }else{
            FullReceita newObj = new FullReceita();
            newObj.setId(receita.getId());
            newObj.setIdNutri(null);
            newObj.setIngredientes(receita.getIngredientes());
            newObj.setKcal(receita.getKcal());
            newObj.setModoDePreparo(receita.getModoDePreparo());
            newObj.setNomeDaReceita(receita.getNomeDaReceita());
            newObj.setProteinas(receita.getProteinas());
            return ResponseEntity.ok().body(newObj);
        }
    }

    @PutMapping("/aceitarReceita")
    public ResponseEntity<Void> aceitarReceita(@RequestBody FullReceita newReceita){
        this.receitasService.aceitarReceita(newReceita);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/plano/{plano_id}")
    public ResponseEntity<List<Receita>> getReceitasByPlanoAlimentar(@PathVariable Long plano_id){
        return ResponseEntity.ok().body(this.receitasService.getReceitasByPlanoAlimentar(plano_id));
    }
}
