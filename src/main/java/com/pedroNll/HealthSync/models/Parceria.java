package com.pedroNll.HealthSync.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Parceria")
@Getter
@Setter
public class Parceria {

    public interface createParceria{};
    public interface updateParceria{};

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_autorNutri", referencedColumnName = "Id", nullable = true)
    private Nutricionista autorNutri;

    @ManyToOne
    @JoinColumn(name = "id_autorPE", referencedColumnName = "Id", nullable = true)
    private ProfissionalExercicio autorPE;

    @Column(name = "username", nullable = false, unique = true)
    @NotNull(groups = {createParceria.class,updateParceria.class})
    @NotEmpty(groups = {createParceria.class,updateParceria.class})
    private String nome;

    @Column(name = "descricao", nullable = false, unique = true)
    @NotNull(groups = {createParceria.class,updateParceria.class})
    @NotEmpty(groups = {createParceria.class,updateParceria.class})
    private String descricao;

    @Column(name = "preco", nullable = false, unique = true)
    @NotNull(groups = {createParceria.class,updateParceria.class})
    @NotEmpty(groups = {createParceria.class,updateParceria.class})
    private String preco;

}
