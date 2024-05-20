package com.pedroNll.HealthSync.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReceitaReponse {
    private Long id;
    private String nomeReceita;
    private String nomeAutor;
    private Long id_plano_alm;
    //private PlanoAlimentar planoAlimentar;
}
