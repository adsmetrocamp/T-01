import React from 'react';
import { BaseLayout } from '../components/Layouts/BaseLayout';
import { Box, Text, Heading } from '@chakra-ui/react';
import { EventInformationContainer } from '../components/Event/EventInformationContainer';
import { EventData } from '../models/events/EventData';

interface Props {

}


const eventData: EventData = { name: 'Meu evento', category: { id: '1', name: 'Música' }, description: 'asdasd', eventDate: new Date(), id: '1', price: 20.50, availableTickets: 5, totalParticipants: 10, imageUri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' };

export const Event = (props: Props) => {
    return (
        <BaseLayout>

            <Box display='flex' justifyContent='center'>
                <EventInformationContainer eventData={eventData} />

                <Box height={'70vh'} width='100%' overflow='hidden' position='absolute' top={85} zIndex={-1}>
                    <Box
                        bgImage={`url(${eventData.imageUri})`}
                        width='100%'
                        height='100%'
                        bgSize='cover'
                        filter='blur(15px)'
                        bgPosition='center center'
                    />
                </Box>
            </Box>

        </BaseLayout >
    );
};
