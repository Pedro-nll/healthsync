package com.pedroNll.HealthSync.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.Parceria;
import com.pedroNll.HealthSync.repositories.ParceriaRepository;

import jakarta.transaction.Transactional;

@Service
public class ParceriaService {
    
    @Autowired
    private ParceriaRepository parceriaRepository;

    public List<Parceria> findByNutriId(Long id){
        List<Parceria> parcerias = this.parceriaRepository.findAllByAutorNutri_Id(id);
        return parcerias;
    }

    public List<Parceria> findByPEId(Long id){
        List<Parceria> parcerias = this.parceriaRepository.findAllByAutorPE_Id(id);
        return parcerias;
    }

    public Parceria findById(Long id) {
        Optional<Parceria> parceria = parceriaRepository.findById(id);
        return parceria.orElseThrow(() -> new RuntimeException());
    }

    public List<Parceria> findAllParceria() {
        return parceriaRepository.findAll();
    }

    @Transactional
    public Parceria create(Parceria obj){
        obj.setId(null);
        obj = parceriaRepository.save(obj);
        return obj;
    }

    @Transactional
    public Parceria update(Parceria obj){
        Parceria newObj = findById(obj.getId());
        newObj.setNome(obj.getNome());
        newObj.setPreco(obj.getPreco());
        newObj.setDescricao(obj.getDescricao());
        return parceriaRepository.save(newObj);
    }
}
