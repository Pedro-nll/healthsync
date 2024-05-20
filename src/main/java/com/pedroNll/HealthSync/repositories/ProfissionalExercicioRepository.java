package com.pedroNll.HealthSync.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedroNll.HealthSync.models.ProfissionalExercicio;
import java.util.Optional;


@Repository
public interface ProfissionalExercicioRepository extends JpaRepository<ProfissionalExercicio,Long>{
    Optional<ProfissionalExercicio> findByUsername(String username);
}
