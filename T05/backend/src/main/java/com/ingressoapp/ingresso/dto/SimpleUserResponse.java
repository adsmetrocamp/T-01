package com.ingressoapp.ingresso.dto;

import com.ingressoapp.ingresso.model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class SimpleUserResponse {

    private String name;
    private UUID id;

    static SimpleUserResponse toResponse(User user) {
        SimpleUserResponse response = new SimpleUserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        return response;
    }

}
