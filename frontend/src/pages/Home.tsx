import { Box, Heading, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { EventCard } from '../components/Home/EventCard';
import { EventCategorySlider } from '../components/Home/EventCategorySlider';
import { BaseLayout } from '../components/Layouts/BaseLayout';
import { EventCategory } from '../models/events/EventCategory';
import { EventData } from '../models/events/EventData';

interface Props {

}

const events: EventData[] = [
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '1', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '2', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '3', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '4', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '5', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '6', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '7', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '8', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
];

export const Home = (props: Props) => {

    const [selectedCategory, setSelectedCategory] = useState<EventCategory>({ id: null, name: 'Todos' });


    return (
        <BaseLayout>
            <Box pt={'80px'} px={'15%'} bgColor='#fff'>

                <Heading>
                    <Heading display='inline' color='purple.500'>Novos</Heading> Eventos
                </Heading>

                <EventCategorySlider selectedCategory={selectedCategory} onChangeCategory={setSelectedCategory} />

                <Box display='flex' flexWrap='wrap' mt={5}>
                    {events.map(e => <EventCard event={e} />)}
                </Box>

            </Box>
        </BaseLayout>
    );
};
