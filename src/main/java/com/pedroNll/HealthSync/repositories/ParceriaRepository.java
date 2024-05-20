package com.pedroNll.HealthSync.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedroNll.HealthSync.models.Parceria;

public interface ParceriaRepository extends JpaRepository<Parceria, Long> {
    List<Parceria> findAllByAutorNutri_Id(Long id);
    List<Parceria> findAllByAutorPE_Id(Long id);
}
