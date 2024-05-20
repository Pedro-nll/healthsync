package com.pedroNll.HealthSync.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class Pessoa {
    public interface createPessoa{};
    public interface updatePessoa{};

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", unique = true, nullable = false)
    private Long id;
    
    @Column(name = "DataCriacao", nullable = false)
    private LocalDate dataDeCriacaoDaConta;
    
    @Column(name = "username", nullable = false, unique = true)
    @NotNull(groups = createPessoa.class)
    @NotEmpty(groups = createPessoa.class)
    private String username;

    @Column(name = "senha", nullable = false)
    @NotNull(groups = {createPessoa.class, updatePessoa.class})
    @NotEmpty(groups = {createPessoa.class, updatePessoa.class})
    private String senha;

    @Column(name="email", unique = true)
    @NotNull(groups = {createPessoa.class, updatePessoa.class})
    @NotEmpty(groups = {createPessoa.class, updatePessoa.class})
    private String email;

    @Column(name="dataNascimento", nullable = false)
    private LocalDate dataNascimento;
}
