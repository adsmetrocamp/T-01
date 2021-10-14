package com.ingressoapp.ingresso.dto;

import com.ingressoapp.ingresso.model.EventCategory;
import lombok.Data;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Data
public class EventCategoryDto {

    private UUID id;

    @NotNull
    @Size(min = 2, max = 255)
    private String name;

    public EventCategory toEventCategory(){
        EventCategory category = new EventCategory();

        String treatedCategoryName = StringUtils.capitalize(this.name.trim());

        category.setName(treatedCategoryName);
        category.setId(this.id);
        return category;
    }

    public static EventCategoryDto toResponse(EventCategory eventCategory) {
        EventCategoryDto categoryDto = new EventCategoryDto();

        categoryDto.setId(eventCategory.getId());
        categoryDto.setName(eventCategory.getName());
        return categoryDto;
    }

}
