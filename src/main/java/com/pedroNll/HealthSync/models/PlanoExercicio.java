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
@Table(name = "planoExercicio")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlanoExercicio {
    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "Id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_prof", referencedColumnName = "Id", nullable = true)
    private ProfissionalExercicio profissionalExercicio;

    @Column(name = "quantidade_de_exercicio_desejada", nullable = true, unique = false)
    private String quantidadeDeExercicioDesejada;

    @Column(name = "tempo_diario_para_atividades", nullable = true, unique = false)
    private String tempoDiarioParaAtividades;

    @Column(name = "experiencia_anterior", nullable = true, unique = false)
    private String experienciaAnteriorExercicio;

    @Column(name = "estabelecimentos_disponiveis", nullable = true, unique = false)
    private String estabelecimentosDisponiveis;

    @Column(name = "deficiencias_fisicas", nullable = true, unique = false)
    private String deficienciasFisicas;

    @Column(name = "data_pedido", nullable = true, unique = false)
    private LocalDate dataPedido;

    @Column(name = "plano", nullable = true, unique = false, length = 5000)
    private String plano;

    @Column(name = "comentarios", nullable = true, unique = false, length = 5000)
    private String comentarios;

    @Column(name = "planoAceito", nullable = true, unique = false)
    private Boolean planoAceito;
    
    public Long getClienteId(){
        return this.cliente.getId();
    }
}
