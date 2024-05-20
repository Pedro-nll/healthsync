package com.pedroNll.HealthSync.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedroNll.HealthSync.models.PlanoExercicio;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanoExercicioRepository extends JpaRepository<PlanoExercicio, Long>{
    Optional<PlanoExercicio> findByCliente_Id(Long clienteId);
    Optional<List<PlanoExercicio>> findAllByProfissionalExercicioIsNull();
    Optional< List<PlanoExercicio>> findAllByPlanoAceito(Boolean planoAceito);
}
