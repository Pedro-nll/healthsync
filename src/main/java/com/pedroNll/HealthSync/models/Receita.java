package com.pedroNll.HealthSync.models;

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
@Table(name = "receitas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "plano_alimentar", referencedColumnName = "id", nullable = true)
    private PlanoAlimentar planoAlimentar;
    @Column(name = "kcal", nullable = true, unique = false)
    private String kcal;
    @Column(name = "proteinas", nullable = true, unique = false)
    private String proteinas;
    @Column(name = "ingredientes", nullable = true, unique = false)
    private String ingredientes;
    @Column(name = "modo_de_preparo", nullable = true, unique = false)
    private String modoDePreparo;
    @ManyToOne
    @JoinColumn(name = "avaliador", referencedColumnName = "Id", nullable = true)
    private Nutricionista avaliador;
    @Column(name = "nome", nullable = true, unique = false)
    private String nomeDaReceita;
}
