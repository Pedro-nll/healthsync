package com.pedroNll.HealthSync.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedroNll.HealthSync.models.Receita;
import java.util.List;
import java.util.Optional;



@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    Optional<List<Receita>> findAllByAvaliadorIsNull();
    Optional<Receita> findById(Long id);
    List<Receita> findAllByPlanoAlimentar_Id(Long id);
}
