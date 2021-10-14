package com.ingressoapp.ingresso.repository;

import com.ingressoapp.ingresso.model.Event;
import com.ingressoapp.ingresso.model.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EventCategoryRepository extends JpaRepository<EventCategory, UUID> {
    EventCategory findOneByName(String name);
}
