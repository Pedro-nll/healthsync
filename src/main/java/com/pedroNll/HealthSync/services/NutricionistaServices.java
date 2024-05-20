package com.pedroNll.HealthSync.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.Nutricionista;
import com.pedroNll.HealthSync.repositories.NutricionistaRepository;

import jakarta.transaction.Transactional;

@Service
public class NutricionistaServices {
    @Autowired
    private NutricionistaRepository nutricionistaRepository;
    
    public Nutricionista findById(Long id){
        Optional<Nutricionista> nutricionista =  this.nutricionistaRepository.findById(id);
        return nutricionista.orElseThrow(() -> new RuntimeException());
    }
    public Nutricionista findByUsername(String username){
        Optional<Nutricionista> nutricionista =  this.nutricionistaRepository.findByUsername(username);
        return nutricionista.orElseThrow(() -> new RuntimeException());
    }

    @Transactional
    public Nutricionista create(Nutricionista obj){
        obj.setId(null);
        obj = this.nutricionistaRepository.save(obj);
        return obj;
    }
    @Transactional
    public Nutricionista update(Nutricionista obj){
        Nutricionista newObj = findById(obj.getId());
        newObj.setEmail(obj.getEmail());
        newObj.setSenha(obj.getSenha());
        return this.nutricionistaRepository.save(newObj);
    }
}
