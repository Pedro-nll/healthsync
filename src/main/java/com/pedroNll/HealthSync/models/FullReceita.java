package com.pedroNll.HealthSync.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FullReceita {
    private Long id;
    private String kcal;
    private String proteinas;
    private String ingredientes;
    private String modoDePreparo;
    private Long idNutri;
    private String nomeDaReceita;
}
