package com.pedroNll.HealthSync.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.ProfissionalExercicio;
import com.pedroNll.HealthSync.repositories.ProfissionalExercicioRepository;

import jakarta.transaction.Transactional;

@Service
public class ProfissionalExercicioServices {
    @Autowired
    private ProfissionalExercicioRepository nutricionistaRepository;
    
    public ProfissionalExercicio findById(Long id){
        Optional<ProfissionalExercicio> profissional =  this.nutricionistaRepository.findById(id);
        return profissional.orElseThrow(() -> new RuntimeException());
    }
    public ProfissionalExercicio findByUsername(String username){
        Optional<ProfissionalExercicio> profissional =  this.nutricionistaRepository.findByUsername(username);
        return profissional.orElseThrow(() -> new RuntimeException());
    }

    @Transactional
    public ProfissionalExercicio create(ProfissionalExercicio obj){
        obj.setId(null);
        obj = this.nutricionistaRepository.save(obj);
        return obj;
    }
    @Transactional
    public ProfissionalExercicio update(ProfissionalExercicio obj){
        ProfissionalExercicio newObj = findById(obj.getId());
        newObj.setEmail(obj.getEmail());
        newObj.setSenha(obj.getSenha());
        return this.nutricionistaRepository.save(newObj);
    }
}
