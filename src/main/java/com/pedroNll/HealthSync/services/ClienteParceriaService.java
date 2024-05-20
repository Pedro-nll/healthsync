package com.pedroNll.HealthSync.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.controllers.CPRequest;
import com.pedroNll.HealthSync.models.ClienteParceria;
import com.pedroNll.HealthSync.repositories.ClienteParceriaRepository;

import jakarta.transaction.Transactional;

@Service
public class ClienteParceriaService {
    @Autowired
    ClienteParceriaRepository clienteParceriaRepository;
    @Autowired
    ParceriaService parceriaService;

    @Transactional
    public ClienteParceria create(CPRequest obj){
        ClienteParceria newObj = new ClienteParceria();
        newObj.setAceito(null);
        newObj.setCliente(obj.getCliente());
        newObj.setParceria(parceriaService.findById(obj.getParceriaId()));
        newObj.setNutri(null);
        return this.clienteParceriaRepository.save(newObj);
    }

    @Transactional
    public ClienteParceria atualizarClienteParceria(ClienteParceria obj){
        Optional<ClienteParceria> newObj = this.findById(obj.getId());
        if(newObj.isEmpty())
            return null;
        ClienteParceria cp = newObj.get();
        cp.setAceito(obj.getAceito());
        cp.setCliente(obj.getCliente());
        cp.setNutri(obj.getNutri());
        cp.setParceria(obj.getParceria());
        return this.clienteParceriaRepository.save(cp);
    }

    public List<ClienteParceria> findParceriasByClienteId(Long id){
        return this.clienteParceriaRepository.findAllByCliente_Id(id);
    }

    public List<ClienteParceria> findByNullNutri(){
        return this.clienteParceriaRepository.findByNutriIsNull();
    }

    public Optional<ClienteParceria> findById(Long id){
        return this.clienteParceriaRepository.findById(id);
    }
}
