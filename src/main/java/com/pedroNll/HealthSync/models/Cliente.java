package com.pedroNll.HealthSync.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente extends Pessoa{
    @Column(name = "peso", nullable = true)
    private float peso;

    @Column(name="altura", nullable = true)
    private float altura;

    @Column(name = "sexo", nullable = true)
    private String sexo;

    @Column(name = "sono", nullable = true)
    private float horasDeSono;

    @Column(name = "medicacoes", nullable = true)
    private String medicacoesEmUso;
    
    @Column(name= "condicoesMedicas", nullable = true)
    private String condicoesMedicas;

    @Column(name = "alcoolTabaco", nullable = true)
    private String alcoolTabaco;

    @Column(name = "objetivo", nullable = true)
    private String objetivo;

    @Column(name = "atividadeAtual", nullable = true)
    private String atividadeAtual;
}
