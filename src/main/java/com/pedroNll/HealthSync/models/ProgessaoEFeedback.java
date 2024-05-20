package com.pedroNll.HealthSync.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "projecao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProgessaoEFeedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "Id", nullable = false)
    private Cliente cliente;
    
    @Column(name = "data", nullable = true, unique = false)
    private LocalDate data;
    
    @Column(name = "peso", nullable = true, unique = false)
    private float peso;
}
