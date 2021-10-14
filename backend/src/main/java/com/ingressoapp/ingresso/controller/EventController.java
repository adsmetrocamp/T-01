package com.ingressoapp.ingresso.controller;

import com.ingressoapp.ingresso.dto.EventCategoryDto;
import com.ingressoapp.ingresso.dto.EventRequest;
import com.ingressoapp.ingresso.dto.EventResponse;
import com.ingressoapp.ingresso.model.Event;
import com.ingressoapp.ingresso.model.EventCategory;
import com.ingressoapp.ingresso.repository.EventCategoryRepository;
import com.ingressoapp.ingresso.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/events")
@Valid
public class EventController {

    @Autowired
    private EventCategoryRepository eventCategoryRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping()
    private List<EventCategoryDto> getAllEvents() {
        return eventCategoryRepository.findAll().stream().map(EventCategoryDto::toResponse)
                .collect(Collectors.toList());
    }

    @PostMapping()
    private EventResponse addEvent(@Valid @RequestBody EventRequest eventRequest) {
        Event eventToCreate = eventRequest.toEvent();
        eventToCreate.setId(null);

        Optional<EventCategory> findCategoryById = eventCategoryRepository.findById(eventRequest.getCategoryId());

        if (!findCategoryById.isPresent()) {
            throw new ValidationException("Não foi possível encontrar a categoria selecionada. Pode ser que a mesma tenha sido excluída");
        }

        eventToCreate.setCategory(findCategoryById.get());

        return EventResponse.toResponse(eventRepository.save(eventToCreate));
    }

    @PutMapping("/{id}")
    private EventResponse updateEvent(@Valid @RequestBody EventRequest eventRequest, @PathVariable("id") UUID id) {
        Event eventToCreate = eventRequest.toEvent();
        eventToCreate.setId(id);

        Optional<EventCategory> findCategoryById = eventCategoryRepository.findById(eventRequest.getCategoryId());

        if (!findCategoryById.isPresent()) {
            throw new ValidationException("Não foi possível encontrar a categoria selecionada. Pode ser que a mesma tenha sido excluída");
        }

        eventToCreate.setCategory(findCategoryById.get());

        return EventResponse.toResponse(eventRepository.save(eventToCreate));
    }

}


