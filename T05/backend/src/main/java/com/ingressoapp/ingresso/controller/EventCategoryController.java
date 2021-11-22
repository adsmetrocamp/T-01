package com.ingressoapp.ingresso.controller;

import com.ingressoapp.ingresso.dto.EventCategoryDto;
import com.ingressoapp.ingresso.dto.UserDto;
import com.ingressoapp.ingresso.dto.UserLoginRequest;
import com.ingressoapp.ingresso.exception.ForbiddenException;
import com.ingressoapp.ingresso.model.Event;
import com.ingressoapp.ingresso.model.EventCategory;
import com.ingressoapp.ingresso.model.User;
import com.ingressoapp.ingresso.repository.EventCategoryRepository;
import com.ingressoapp.ingresso.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/events/categories")
@Valid
public class EventCategoryController {

    @Autowired
    private EventCategoryRepository eventCategoryRepository;

    @GetMapping()
    private List<EventCategoryDto> getAll() {
        return eventCategoryRepository.findAll().stream().map(EventCategoryDto::toResponse)
                .collect(Collectors.toList());
    }

    private void validateExistingCategory(String name) {
        EventCategory existsCategory = eventCategoryRepository.findOneByName(name);

        if (existsCategory != null) {
            throw new ValidationException("Já existe uma categoria com o nome " + name);
        }
    }

    @PostMapping()
    private EventCategoryDto addCategory(@Valid @RequestBody EventCategoryDto categoryDto) {
        EventCategory categoryToCreate = categoryDto.toEventCategory();
        categoryToCreate.setId(null);

        validateExistingCategory(categoryToCreate.getName());

        return EventCategoryDto.toResponse(eventCategoryRepository.save(categoryToCreate));
    }

    @PutMapping("/{id}")
    private EventCategoryDto updateCategory(@Valid @RequestBody EventCategoryDto categoryDto, @PathVariable("id") UUID id) {
        EventCategory categoryToUpdate = categoryDto.toEventCategory();
        categoryToUpdate.setId(id);

        validateExistingCategory(categoryToUpdate.getName());

        return EventCategoryDto.toResponse(eventCategoryRepository.save(categoryToUpdate));
    }

    @DeleteMapping("/{id}")
    private void deleteCategory(@PathVariable("id") UUID id) {
        eventCategoryRepository.deleteById(id);
    }

}


