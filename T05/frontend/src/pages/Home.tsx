import { Box, Heading, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import React, { useState } from 'react';
import useSWR from 'swr';
import { EventCard } from '../components/Home/EventCard';
import { EventCategorySlider } from '../components/Home/EventCategorySlider';
import { BaseLayout } from '../components/Layouts/BaseLayout';
import { EventCategory } from '../models/events/EventCategory';
import { EventData } from '../models/events/EventData';
import EventService from '../services/EventService';

interface Props {}

export const Home = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<EventCategory>({
        id: null,
        name: 'Todos',
    });

    const { data: events } = useSWR<EventData[]>(
        '/events',
        async () => (await EventService.getAllEvents()).data
    );

    return (
        <BaseLayout>
            <Box pt={'80px'} px={'15%'} bgColor="#fff">
                <Heading>
                    <Heading display="inline" color="purple.500">
                        Novos
                    </Heading>{' '}
                    Eventos
                </Heading>

                <EventCategorySlider
                    selectedCategory={selectedCategory}
                    onChangeCategory={setSelectedCategory}
                />

                <Box display="flex" flexWrap="wrap" mt={5}>
                    {!events &&
                        new Array(7)
                            .fill(null)
                            .map((u) => (
                                <Skeleton
                                    width={300}
                                    height={400}
                                    mr={5}
                                    mb={5}
                                />
                            ))}

                    {events?.map((e) => (
                        <EventCard event={e} />
                    ))}
                </Box>
            </Box>
        </BaseLayout>
    );
};
