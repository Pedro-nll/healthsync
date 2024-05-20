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
@Table(name = "cliente_parceria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteParceria {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_parceria", referencedColumnName = "Id", nullable = false)
    private Parceria parceria;
    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "Id", nullable = false)
    private Cliente cliente;
    @ManyToOne
    @JoinColumn(name = "id_nutri", referencedColumnName = "Id", nullable = true)
    private Nutricionista nutri;
    @Column(name = "aceito", unique = false, nullable = true)
    private Boolean aceito;
}
