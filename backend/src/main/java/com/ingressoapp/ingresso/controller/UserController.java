package com.ingressoapp.ingresso.controller;

import com.ingressoapp.ingresso.dto.UserDto;
import com.ingressoapp.ingresso.dto.UserLoginRequest;
import com.ingressoapp.ingresso.exception.ForbiddenException;
import com.ingressoapp.ingresso.model.User;
import com.ingressoapp.ingresso.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/users")
@Valid
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private void validateNewUserRegistration(UserDto userDto) {
        // Verify if doesn't exists an user with same email
        User existsUser = userRepository.findOneByEmail(userDto.getEmail());

        if (existsUser != null) {
            throw new ValidationException("Já existe um usuário com o email " + userDto.getEmail());
        }

        // Verify if doesn't exists an user with same CPF
        existsUser = userRepository.findOneByCpf(userDto.getCpf());

        if (existsUser != null) {
            throw new ValidationException("Já existe um usuário com o CPF " + userDto.getCpf());
        }
    }

    @PostMapping("/register")
    public User register(@Valid @RequestBody UserDto userDto) {

        validateNewUserRegistration(userDto);

        User savedUser = userRepository.save(userDto.toUser());

        return savedUser;
    }

    @PostMapping("/login")
    public User login(@Valid @RequestBody UserLoginRequest userLoginRequest) {

        // Verify if doesn't exists an user with same CPF
        User findUser = userRepository.findOneByEmailAndPassword(userLoginRequest.getEmail(), userLoginRequest.getPassword());

        if (findUser == null) {
            throw new ForbiddenException("Email ou senha incorretos");
        }

        return findUser;
    }

}


