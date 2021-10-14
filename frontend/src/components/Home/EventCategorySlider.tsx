import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { EventCategory } from '../../models/events/EventCategory';

interface Props {
    selectedCategory: EventCategory;
    onChangeCategory: (category: EventCategory) => void;
}

export const EventCategorySlider = (props: Props) => {

    const categories: EventCategory[] = [
        {
            id: null,
            name: 'Todos'
        },
        {
            id: '2',
            name: 'Música'
        },
        {
            id: '3',
            name: 'Carros'
        },
        {
            id: '4',
            name: 'Culinária'
        },
        {
            id: '5',
            name: 'Causas'
        },
        {
            id: '6',
            name: 'Religiosos'
        },
    ];

    return (
        <Box display='flex' mt={5}>

            {categories.map(c => (
                <Box
                    mr={10}
                    cursor='pointer'
                    borderBottom={c.id === props.selectedCategory?.id ? '2px' : '0px'}
                    borderBottomColor='purple.500'
                    pb={2}
                    color={c.id === props.selectedCategory?.id ? 'purple.500' : 'gray.400'}
                    _hover={c.id !== props.selectedCategory?.id ? {
                        color: 'gray.600'
                    } : {}}
                    onClick={() => props.onChangeCategory(c)}
                >
                    <Text
                        fontWeight='600'

                    >{c.name}</Text>
                </Box>
            ))}

        </Box>
    );
};
