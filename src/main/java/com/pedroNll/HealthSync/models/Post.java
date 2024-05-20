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
@Table(name = "Post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", unique = true, nullable = false)
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_autorCliente", referencedColumnName = "Id", nullable = true)
    private Cliente autorCliente;

    @ManyToOne
    @JoinColumn(name = "id_autorNutri", referencedColumnName = "Id", nullable = true)
    private Nutricionista autorNutri;

    @ManyToOne
    @JoinColumn(name = "id_autorPE", referencedColumnName = "Id", nullable = true)
    private ProfissionalExercicio autorPE;

    @ManyToOne
    @JoinColumn(name = "id_avaliadorNutri", referencedColumnName = "Id", nullable = true)
    private Nutricionista avaliadorNutri;

    @ManyToOne
    @JoinColumn(name = "id_avaliadorProfissional", referencedColumnName = "Id", nullable = true)
    private ProfissionalExercicio avaliadorPE;

    @Column(name = "comentarios", nullable = true)
    private String comentarios;

    @Column(name = "postAceito", nullable = true)
    private Boolean postAceito;
    
    @Column(name = "titulo")
    private String titulo;

    @Column(name = "subtitulo")
    private String subTitulo;

    @Column(name = "conteudo", length = 5000)
    private String conteudo;

    @Column(name = "categoria")
    private String categoria;

}
