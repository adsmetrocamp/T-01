package com.ingressoapp.ingresso.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ingressoapp.ingresso.model.User;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.*;
import java.util.Date;

@Data
public class UserDto {

    @NotNull
    @Size(min = 10, max = 255)
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    @Size(min = 8, max = 255)
    private String password;

    @NotNull
    @Past
    private Date birthDate;

    @NotNull
    @CPF
    private String cpf;

    public User toUser() {
        User user = new User();
        user.setName(this.getName());
        user.setEmail(this.getEmail());
        user.setBirthDate(this.getBirthDate());
        user.setCpf(this.getCpf());
        user.setPassword(this.getPassword());

        return user;
    }

}
