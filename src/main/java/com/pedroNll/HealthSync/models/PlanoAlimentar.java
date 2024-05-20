package com.pedroNll.HealthSync.models;

import java.time.LocalDate;

import org.hibernate.annotations.ColumnDefault;

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
@Table(name = "planoAlimentar")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlanoAlimentar {
    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "Id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_nutri", referencedColumnName = "Id", nullable = true)
    @ColumnDefault("-1")
    private Nutricionista nutricionista;
    

    @Column(name = "alergias", nullable = true, unique = false)
    private String alergiasAlimentares;

    @Column(name = "experiencia_anterior_dieta", nullable = true, unique = false)
    private String experienciaAnteriorDieta;

    @Column(name = "deficiencia_vitaminas", nullable = true, unique = false)
    private String deficienciaVitaminas;

    @Column(name = "consumo_agua", nullable = true, unique = false)
    private String consumoAgua;

    @Column(name = "preferencias_alimentares", nullable = true, unique = false)
    private String preferenciasAlimentares;

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
