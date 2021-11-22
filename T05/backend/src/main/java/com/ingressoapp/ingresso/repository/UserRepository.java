package com.ingressoapp.ingresso.repository;

import com.ingressoapp.ingresso.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findOneByCpf(String cpf);
    User findOneByEmail(String email);
    User findOneByEmailAndPassword(String email, String password);
}
