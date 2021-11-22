package com.ingressoapp.ingresso.dto;

import com.ingressoapp.ingresso.model.Event;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class EventResponse {
    private UUID id;

    private String name;

    private int totalTickets;

    private String description;

    private String about;

    private double price;

    private Date eventDate;

    private String image;

    private EventCategoryDto category;

    private Date createdAt;

    private SimpleUserResponse createdByUser;

    public static EventResponse toResponse(Event event) {
        EventResponse eventResponse = new EventResponse();

        eventResponse.setId(event.getId());
        eventResponse.setName(event.getName());
        eventResponse.setTotalTickets(event.getTotalTickets());
        eventResponse.setDescription(event.getDescription());
        eventResponse.setPrice(event.getPrice());
        eventResponse.setEventDate(event.getEventDate());
        eventResponse.setImage(event.getImage());
        eventResponse.setCategory(EventCategoryDto.toResponse(event.getCategory()));
        eventResponse.setCreatedAt(event.getCreatedAt());
        eventResponse.setAbout(event.getAbout());

        if(event.getCreatedByUser() != null) {
            eventResponse.setCreatedByUser(SimpleUserResponse.toResponse(event.getCreatedByUser()));
        }

        return eventResponse;
    }
}
