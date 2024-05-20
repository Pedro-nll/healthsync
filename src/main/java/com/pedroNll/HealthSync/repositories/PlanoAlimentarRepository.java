package com.pedroNll.HealthSync.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedroNll.HealthSync.models.PlanoAlimentar;

import java.util.List;
import java.util.Optional;


@Repository
public interface PlanoAlimentarRepository extends JpaRepository<PlanoAlimentar, Long>{
    Optional<PlanoAlimentar> findByCliente_Id(Long clienteId);
    Optional<List<PlanoAlimentar>> findAllByNutricionista_Id(Long nutricionistaId);
    Optional<List<PlanoAlimentar>> findAllByNutricionistaIsNull();
    Optional<List<PlanoAlimentar>> findAllByPlanoAceito(Boolean planoAceito);
}
