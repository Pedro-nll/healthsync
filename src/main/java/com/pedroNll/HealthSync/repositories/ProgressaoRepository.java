package com.pedroNll.HealthSync.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedroNll.HealthSync.models.ProgessaoEFeedback;
import java.util.List;


public interface ProgressaoRepository extends JpaRepository<ProgessaoEFeedback, Long> {
    List<ProgessaoEFeedback> findAllByCliente_Id(Long cliente_Id);
}
