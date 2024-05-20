package com.pedroNll.HealthSync.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedroNll.HealthSync.models.PlanoExercicio;
import com.pedroNll.HealthSync.repositories.PlanoExercicioRepository;

@Service
public class PlanoExercicioServices {
    @Autowired
    private PlanoExercicioRepository planoExercicioRepository;

    public PlanoExercicio findByClienteId(Long id){
        Optional<PlanoExercicio> plano = this.planoExercicioRepository.findByCliente_Id(id);
        return plano.orElseThrow(() -> new RuntimeException());
    }

    public List<PlanoExercicio> findAllByProfissionalIsNull(){
        Optional<List<PlanoExercicio>> planos = this.planoExercicioRepository.findAllByProfissionalExercicioIsNull();
        return planos.orElseThrow(() -> new RuntimeException());
    }

    public List<PlanoExercicio> findAllByRejeitado(){
        Optional<List<PlanoExercicio>> planos = this.planoExercicioRepository.findAllByPlanoAceito(false);
        return planos.orElseThrow(() -> new RuntimeException());
    }

    public List<PlanoExercicio> getAll(){
        return this.planoExercicioRepository.findAll();
    }

    @Transactional
    public PlanoExercicio createPlanoExercicio(PlanoExercicio obj){
        PlanoExercicio newObj = new PlanoExercicio();
        newObj.setDeficienciasFisicas(obj.getDeficienciasFisicas());
        newObj.setCliente(obj.getCliente());
        newObj.setEstabelecimentosDisponiveis(obj.getEstabelecimentosDisponiveis());
        newObj.setExperienciaAnteriorExercicio(obj.getExperienciaAnteriorExercicio());
        newObj.setProfissionalExercicio(obj.getProfissionalExercicio());
        newObj.setQuantidadeDeExercicioDesejada(obj.getQuantidadeDeExercicioDesejada());
        newObj.setTempoDiarioParaAtividades(obj.getTempoDiarioParaAtividades());
        newObj.setDataPedido(obj.getDataPedido());
        obj = this.planoExercicioRepository.save(newObj);
        return obj;
    }

    @Transactional
    public PlanoExercicio enviarPlanoExercicio(PlanoExercicio obj){
        PlanoExercicio newObj = findByClienteId(obj.getClienteId());
        newObj.setProfissionalExercicio(obj.getProfissionalExercicio());
        newObj.setPlano(obj.getPlano());
        newObj.setPlanoAceito(obj.getPlanoAceito());
        return this.planoExercicioRepository.save(newObj);
    }

    @Transactional
    public PlanoExercicio avaliarPlanoExercicio(PlanoExercicio obj){
        PlanoExercicio newObj = findByClienteId(obj.getClienteId());
        newObj.setComentarios(obj.getComentarios());
        newObj.setPlanoAceito(obj.getPlanoAceito());
        return this.planoExercicioRepository.save(newObj);
    }

    @Transactional
    public PlanoExercicio pedirNovoPlano(PlanoExercicio obj){
        PlanoExercicio newObj = findByClienteId(obj.getClienteId());
        newObj.setPlanoAceito(false);
        newObj.setProfissionalExercicio(null);
        newObj.setComentarios(obj.getComentarios());
        return this.planoExercicioRepository.save(newObj);
    }
}
