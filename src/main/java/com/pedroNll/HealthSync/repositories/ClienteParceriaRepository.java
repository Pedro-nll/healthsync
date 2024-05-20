package com.pedroNll.HealthSync.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedroNll.HealthSync.models.ClienteParceria;
import java.util.List;
import java.util.Optional;


public interface ClienteParceriaRepository extends JpaRepository<ClienteParceria, Long>{
    List<ClienteParceria> findByNutriIsNull();
    Optional<ClienteParceria> findById(Long id);
    List<ClienteParceria> findAllByCliente_Id(Long id);
}
