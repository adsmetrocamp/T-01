package com.ingressoapp.ingresso.dto;

import com.ingressoapp.ingresso.model.Event;
import lombok.Data;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.UUID;

@Data
public class EventRequest {

    @NotNull
    @Size(min = 10, max = 255)
    private String name;

    @Min(1)
    private int totalTickets;

    @NotNull
    @Size(min = 20, max = 255)
    private String description;

    private String about;

    @Min(0)
    private double price;

    @NotNull
    @Future
    private Date eventDate;

    @NotNull
    private String image;

    @NotNull
    private UUID categoryId;

    public Event toEvent() {
        Event event = new Event();

        event.setName(name);
        event.setEventDate(eventDate);
        event.setTotalTickets(totalTickets);
        event.setDescription(description);
        event.setAbout(about);
        event.setPrice(price);
        event.setImage(image);

        return event;
    }
}
