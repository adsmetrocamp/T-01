package com.ingressoapp.ingresso.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class UserLoginRequest {
    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;
}
