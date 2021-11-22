package com.ingressoapp.ingresso.dto;

import com.ingressoapp.ingresso.model.Event;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class SimpleEventResponse {

    private UUID id;

    private String name;

    private int numberOfParticipants;

    private double price;

    private Date eventDate;

    private String image;

    private Date createdAt;

    public static SimpleEventResponse toResponse(Event event) {
        SimpleEventResponse eventResponse = new SimpleEventResponse();

        eventResponse.setId(event.getId());
        eventResponse.setName(event.getName());
        eventResponse.setPrice(event.getPrice());
        eventResponse.setEventDate(event.getEventDate());
        eventResponse.setImage(event.getImage());

        return eventResponse;
    }
}
