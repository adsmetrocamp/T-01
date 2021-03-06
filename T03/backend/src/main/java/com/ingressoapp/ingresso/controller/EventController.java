package com.ingressoapp.ingresso.controller;

import com.ingressoapp.ingresso.dto.EventRequest;
import com.ingressoapp.ingresso.dto.EventResponse;
import com.ingressoapp.ingresso.dto.SimpleEventResponse;
import com.ingressoapp.ingresso.exception.ForbiddenException;
import com.ingressoapp.ingresso.model.Event;
import com.ingressoapp.ingresso.model.EventCategory;
import com.ingressoapp.ingresso.model.User;
import com.ingressoapp.ingresso.repository.EventCategoryRepository;
import com.ingressoapp.ingresso.repository.EventRepository;
import com.ingressoapp.ingresso.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    private List<SimpleEventResponse> getAllEvents() {
        return eventRepository.findAllByOrderByCreatedAtDesc().stream().map(SimpleEventResponse::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    private EventResponse getEventById(@PathVariable("id") UUID id) {
        Optional<Event> findEventById = eventRepository.findById(id);

        if (!findEventById.isPresent()) {
            throw new ValidationException("Não foi possível encontrar o evento de ID " + id);
        }

        return EventResponse.toResponse(findEventById.get());
    }

    @PostMapping()
    private EventResponse addEvent(
            @Valid @RequestBody EventRequest eventRequest,
            @RequestHeader("X-User-Id") String userId
    ) {
        Event eventToCreate = eventRequest.toEvent();
        eventToCreate.setId(null);

        // Try to find the requesting user
        Optional<User> creatingUser = userRepository.findById(UUID.fromString(userId));

        if (!creatingUser.isPresent()) {
            throw new ValidationException("Não existe um usuário com ID " + userId);
        }

        eventToCreate.setCreatedByUser(creatingUser.get());

        Optional<EventCategory> findCategoryById = eventCategoryRepository.findById(eventRequest.getCategoryId());

        if (!findCategoryById.isPresent()) {
            throw new ValidationException("Não foi possível encontrar a categoria selecionada. Pode ser que a mesma tenha sido excluída");
        }

        eventToCreate.setCategory(findCategoryById.get());

        return EventResponse.toResponse(eventRepository.save(eventToCreate));
    }

    @PutMapping("/{id}")
    private EventResponse updateEvent(
            @Valid @RequestBody EventRequest eventRequest,
            @PathVariable("id") UUID id,
            @RequestHeader("X-User-Id") String userId
    ) {

        Optional<Event> event = eventRepository.findById(id);

        if (!event.isPresent()) {
            throw new ValidationException("Não foi possível encontrar o evento de ID " + id);
        }

        if (!event.get().getCreatedByUser().getId().equals(UUID.fromString(userId))) {
            throw new ForbiddenException("Usuário não tem permissão para editar o evento");
        }

        Event newEventData = eventRequest.toEvent();

        newEventData.setCreatedByUser(event.get().getCreatedByUser());

        newEventData.setId(id);

        Optional<EventCategory> findCategoryById = eventCategoryRepository.findById(eventRequest.getCategoryId());

        if (!findCategoryById.isPresent()) {
            throw new ValidationException("Não foi possível encontrar a categoria selecionada. Pode ser que a mesma tenha sido excluída");
        }

        newEventData.setCategory(findCategoryById.get());

        return EventResponse.toResponse(eventRepository.save(newEventData));
    }

}


