import { Box, Heading, Text, Divider } from '@chakra-ui/layout';
import React from 'react';
import { EventData } from '../../models/events/EventData';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTicketAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';


interface Props {
    event: EventData;
}

export const EventCard = ({ event }: Props) => {

    const history = useHistory();

    return (
        <Box
            width={300}
            height={400}
            border='1px solid'
            borderColor='gray.300' borderRadius={10}
            mr={5}
            mb={5}
            overflow='hidden'
            cursor='pointer'
            transition='all .2s'
            _hover={{
                boxShadow: '0 16px 64px -16px rgb(46 55 77 / 24%)',
                transform: 'scale(1.03) translateY(-10px)'
            }}
            onClick={() => history.push('/event/' + event.id)}
        >
            <Box bgImage={`url(${event.imageUri})`} height={170} bgSize='cover' bgPosition='center center' />

            <Box p={4}>
                <Heading size='md' color='gray.600'>{event.name}</Heading>
                <Text size='md' color='purple.500' fontWeight='600' my={3} fontSize='13'>{moment(event.eventDate).format('llll')}</Text>

                <Divider />

                <Text fontWeight='600' mt={3} fontSize='15'>
                    <FontAwesomeIcon icon={faMoneyBill} color='#805ad5' />
                    <Text ml={2} display='inline' color='purple.500'>
                        {event.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </Text>
                </Text>

                <Text fontWeight='600' mt={1} fontSize='15'>
                    <FontAwesomeIcon icon={faUsers} color='#4a5568' />
                    <Text ml={2} display='inline' color='gray.600'>
                        {event.totalParticipants} participantes
                    </Text>
                </Text>

                <Text fontWeight='600' mt={1} fontSize='15'>
                    <FontAwesomeIcon icon={faTicketAlt} color='#4a5568' />
                    <Text ml={2} display='inline' color='gray.600'>
                        {event.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </Text>
                </Text>
            </Box>

        </Box>
    );
};
