import React, { useMemo } from 'react';
import { Box, Text, Skeleton } from '@chakra-ui/react';
import { EventCategory } from '../../models/events/EventCategory';
import useSWR from 'swr';
import EventCategoryService from '../../services/EventCategoryService';

interface Props {
    selectedCategory: EventCategory;
    onChangeCategory: (category: EventCategory) => void;
}

export const EventCategorySlider = (props: Props) => {
    const { data: categories } = useSWR<EventCategory[]>(
        '/events/categories',
        async () => (await EventCategoryService.getAllCategories()).data
    );

    const eventCategories = useMemo(() => {
        if (!categories) return null;

        return [
            {
                id: null,
                name: 'Todos',
            },
            ...categories,
        ];
    }, [categories]);

    return (
        <Box display="flex" mt={5}>
            {!categories && (
                <Box display="flex" mt={0.5}>
                    {new Array(7).fill(null).map(() => (
                        <Skeleton height="20px" width="100px" mr={5} />
                    ))}
                </Box>
            )}

            {eventCategories?.map((c) => (
                <Box
                    mr={10}
                    cursor="pointer"
                    borderBottom={
                        c.id === props.selectedCategory?.id ? '2px' : '0px'
                    }
                    borderBottomColor="purple.500"
                    pb={2}
                    color={
                        c.id === props.selectedCategory?.id
                            ? 'purple.500'
                            : 'gray.400'
                    }
                    _hover={
                        c.id !== props.selectedCategory?.id
                            ? {
                                  color: 'gray.600',
                              }
                            : {}
                    }
                    onClick={() => props.onChangeCategory(c)}
                >
                    <Text fontWeight="600">{c.name}</Text>
                </Box>
            ))}
        </Box>
    );
};
