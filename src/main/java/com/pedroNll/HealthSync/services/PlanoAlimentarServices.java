package com.pedroNll.HealthSync.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.PlanoAlimentar;
import com.pedroNll.HealthSync.repositories.PlanoAlimentarRepository;

import jakarta.transaction.Transactional;

@Service
public class PlanoAlimentarServices {
    @Autowired
    private PlanoAlimentarRepository planoAlimentarRepository;

    public PlanoAlimentar findByClienteId(Long id){
        Optional<PlanoAlimentar> plano = this.planoAlimentarRepository.findByCliente_Id(id);
        return plano.orElseThrow(() -> new RuntimeException());
    }

    public List<PlanoAlimentar> findAllByNutricionistaId(Long Id){
        Optional<List<PlanoAlimentar>> planos = this.planoAlimentarRepository.findAllByNutricionista_Id(Id);
        return planos.orElseThrow(() -> new RuntimeException());
    }

    public List<PlanoAlimentar> findAllByNutricionistaIsNull(){
        Optional<List<PlanoAlimentar>> planos = this.planoAlimentarRepository.findAllByNutricionistaIsNull();
        return planos.orElseThrow(() -> new RuntimeException());
    }

    public List<PlanoAlimentar> findAllByRejeitado(){
        Optional<List<PlanoAlimentar>> planos = this.planoAlimentarRepository.findAllByPlanoAceito(false);
        return planos.orElseThrow(() -> new RuntimeException());
    }

    public List<PlanoAlimentar> getAllPlanos(){
        return this.planoAlimentarRepository.findAll();
    }

    @Transactional
    public PlanoAlimentar createPlanoAlimentar(PlanoAlimentar obj){
        PlanoAlimentar newObj = new PlanoAlimentar();
        newObj.setAlergiasAlimentares(obj.getAlergiasAlimentares());
        newObj.setCliente(obj.getCliente());
        newObj.setConsumoAgua(obj.getConsumoAgua());
        newObj.setDeficienciaVitaminas(obj.getDeficienciaVitaminas());
        newObj.setExperienciaAnteriorDieta(obj.getExperienciaAnteriorDieta());
        newObj.setNutricionista(obj.getNutricionista());
        newObj.setPreferenciasAlimentares(obj.getPreferenciasAlimentares());
        newObj.setDataPedido(obj.getDataPedido());
        obj = this.planoAlimentarRepository.save(newObj);
        return obj;
    }

    @Transactional
    public PlanoAlimentar enviarPlanoAlimentar(PlanoAlimentar obj){
        PlanoAlimentar newObj = findByClienteId(obj.getClienteId());
        newObj.setNutricionista(obj.getNutricionista());
        newObj.setPlano(obj.getPlano());
        newObj.setPlanoAceito(obj.getPlanoAceito());
        return this.planoAlimentarRepository.save(newObj);
    }

    @Transactional
    public PlanoAlimentar avaliarPlanoAlimentar(PlanoAlimentar obj){
        PlanoAlimentar newObj = findByClienteId(obj.getClienteId());
        newObj.setComentarios(obj.getComentarios());
        newObj.setPlanoAceito(obj.getPlanoAceito());
        return this.planoAlimentarRepository.save(newObj);
    }

    @Transactional
    public PlanoAlimentar pedirNovoPlano(PlanoAlimentar obj){
        PlanoAlimentar newObj = findByClienteId(obj.getClienteId());
        newObj.setPlanoAceito(false);
        newObj.setNutricionista(null);
        newObj.setComentarios(obj.getComentarios());
        this.planoAlimentarRepository.save(newObj);
        return newObj;
    }
}
