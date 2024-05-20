package com.pedroNll.HealthSync.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.FullReceita;
import com.pedroNll.HealthSync.models.Receita;
import com.pedroNll.HealthSync.repositories.ReceitaRepository;

import jakarta.transaction.Transactional;

@Service
public class ReceitasService {
    @Autowired
    private ReceitaRepository receitaRepository;
    @Autowired
    private NutricionistaServices nutricionistaServices;

    @Transactional
    public void adicionarReceita(Receita obj){
        this.receitaRepository.save(obj);
    }

    public Optional<List<Receita>> getReceitasComAvaliadorNull() {
        return receitaRepository.findAllByAvaliadorIsNull();
    }

    public Receita getReceitaById(Long id){
        Optional<Receita> receita = this.receitaRepository.findById(id);
        if(receita.isPresent()){
            return receita.get();
        }else{
            return null;
        }   
    }
    @Transactional
    public void aceitarReceita(FullReceita newObj){
        Receita receita = this.getReceitaById(newObj.getId());
        receita.setAvaliador(this.nutricionistaServices.findById(newObj.getIdNutri()));
        receita.setIngredientes(newObj.getIngredientes());
        receita.setKcal(newObj.getKcal());
        receita.setModoDePreparo(newObj.getModoDePreparo());
        receita.setNomeDaReceita(newObj.getNomeDaReceita());
        receita.setProteinas(newObj.getProteinas());
        this.receitaRepository.save(receita);
    }

    public List<Receita> getReceitasByPlanoAlimentar(Long plano_id){
        return this.receitaRepository.findAllByPlanoAlimentar_Id(plano_id);
    }
}
