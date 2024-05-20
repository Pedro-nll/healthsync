package com.pedroNll.HealthSync.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedroNll.HealthSync.models.Nutricionista;


@Repository
public interface NutricionistaRepository extends JpaRepository<Nutricionista,Long>{
    Optional<Nutricionista>findByUsername(String username);
}
