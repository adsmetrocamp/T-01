import React from 'react';
import { BaseLayout } from '../components/Layouts/BaseLayout';
import { Box, Text, Skeleton } from '@chakra-ui/react';
import { EventInformationContainer } from '../components/Event/EventInformationContainer';
import { EventData } from '../models/events/EventData';
import useSWR from 'swr';
import { Redirect, useParams } from 'react-router';
import EventService from '../services/EventService';

interface Props {}

export const Event = (props: Props) => {
    const { id } = useParams<{ id: string }>();

    const { data: eventData, error } = useSWR<EventData>(
        `/events/${id}`,
        async () => (await EventService.getEventById(id)).data
    );

    if (error && !eventData) {
        return <Redirect to="/" />;
    }

    return (
        <BaseLayout>
            <Box display="flex" justifyContent="center">
                <EventInformationContainer eventData={eventData} />

                <Box
                    height={'70vh'}
                    width="100%"
                    overflow="hidden"
                    position="absolute"
                    top={85}
                    zIndex={-1}
                >
                    <Box
                        bgImage={`url(${eventData?.image})`}
                        width="100%"
                        height="100%"
                        bgSize="cover"
                        filter="blur(15px)"
                        bgPosition="center center"
                    >
                        {!eventData && <Skeleton width="100%" height="100%" />}
                    </Box>
                </Box>
            </Box>
        </BaseLayout>
    );
};
