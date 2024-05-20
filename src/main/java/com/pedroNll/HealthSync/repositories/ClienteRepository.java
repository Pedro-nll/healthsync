package com.pedroNll.HealthSync.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedroNll.HealthSync.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,Long>{
    Optional<Cliente> findByUsername(String username); 
}
