package com.pedroNll.HealthSync.controllers;

import com.pedroNll.HealthSync.models.Cliente;

import lombok.Data;

@Data
public class CPRequest {
    private Long parceriaId;
    private Cliente cliente;
}
