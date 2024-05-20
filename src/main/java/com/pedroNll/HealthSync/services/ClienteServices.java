package com.pedroNll.HealthSync.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.Cliente;
import com.pedroNll.HealthSync.models.Pessoa;
import com.pedroNll.HealthSync.repositories.ClienteRepository;

import jakarta.transaction.Transactional;

@Service
public class ClienteServices {
    @Autowired
    private ClienteRepository clienteRepository;
    
    public Cliente findById(Long id){
        Optional<Cliente> cliente =  this.clienteRepository.findById(id);
        return cliente.orElseThrow(() -> new RuntimeException());
    }
    public Cliente findByUsername(String username){
        Optional<Cliente> cliente =  this.clienteRepository.findByUsername(username);
        return cliente.orElseThrow(() -> new RuntimeException());
    }

    @Transactional
    public Cliente createPessoa(Pessoa obj){
        Cliente newObj = new Cliente();
        newObj.setSenha(obj.getSenha());
        newObj.setUsername(obj.getUsername());
        newObj.setEmail(obj.getEmail());
        newObj.setDataDeCriacaoDaConta(obj.getDataDeCriacaoDaConta());
        newObj.setDataNascimento(obj.getDataNascimento());
        obj = this.clienteRepository.save(newObj);
        return (Cliente) obj;
    }
    @Transactional
    public Cliente update(Cliente obj){
        Cliente newObj = findById(obj.getId());
        newObj.setEmail(obj.getEmail());
        newObj.setSenha(obj.getSenha());
        return this.clienteRepository.save(newObj);
    }
    @Transactional
    public Cliente createDadosGerais(Cliente obj){
        Cliente newObj = findById(obj.getId());
        newObj.setPeso(obj.getPeso());
        newObj.setAltura(obj.getAltura());
        newObj.setSexo(obj.getSexo());
        newObj.setHorasDeSono(obj.getHorasDeSono());
        newObj.setMedicacoesEmUso(obj.getMedicacoesEmUso());
        newObj.setCondicoesMedicas(obj.getCondicoesMedicas());
        newObj.setAlcoolTabaco(obj.getAlcoolTabaco());
        newObj.setObjetivo(obj.getObjetivo());
        newObj.setAtividadeAtual(obj.getAtividadeAtual());
        return this.clienteRepository.save(newObj);
    }
}
