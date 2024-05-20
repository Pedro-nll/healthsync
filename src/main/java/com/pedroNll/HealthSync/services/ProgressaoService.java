package com.pedroNll.HealthSync.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.ProgessaoEFeedback;
import com.pedroNll.HealthSync.repositories.ProgressaoRepository;

import jakarta.transaction.Transactional;

@Service
public class ProgressaoService {
    @Autowired
    private ProgressaoRepository progressaoRepository;

    public ProgessaoEFeedback findById(Long id) throws RuntimeException{
        return this.progressaoRepository.findById(id).orElseThrow();
    }

    public List<ProgessaoEFeedback> findAllByCliente(Long id){
        List<ProgessaoEFeedback> listaPf = this.progressaoRepository.findAllByCliente_Id(id);
        return listaPf;
    }

    public List<ProgessaoEFeedback> getAll(){
        return this.progressaoRepository.findAll();
    }

    @Transactional
    public ProgessaoEFeedback postPeso(ProgessaoEFeedback pf){
        return this.progressaoRepository.save(pf);
    }

    @Transactional
    public ProgessaoEFeedback atualizarPeso(ProgessaoEFeedback pf){
        ProgessaoEFeedback newObj = this.findById(pf.getId());
        newObj.setPeso(pf.getPeso());
        return this.progressaoRepository.save(newObj);
    }
}
