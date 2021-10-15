import { Button } from '@chakra-ui/button';
import { Box, Divider, Grid, Heading, Text } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/skeleton';
import {
    faMoneyBill,
    faUsers,
    faTicketAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { EventData } from '../../models/events/EventData';

interface Props {
    eventData?: EventData;
}

export const EventInformationContainer = ({ eventData }: Props) => {
    return (
        <Box
            width="50%"
            minHeight="800px"
            bgColor="#fff"
            zIndex={99}
            marginTop={20}
            boxShadow="0 1px 2px 0 rgb(0 0 0 / 15%)"
            borderRadius={5}
            mb={10}
        >
            <Box display="flex" bgColor="#ECEFF1">
                <Box width="70%" height={'500px'}>
                    <Box
                        bgImage={`url(${eventData?.image})`}
                        height={'100%'}
                        bgSize="cover"
                        bgPosition="center center"
                    >
                        {!eventData && <Skeleton width="100%" height="100%" />}
                    </Box>
                </Box>

                <Box width="30%">
                    <Box
                        p={7}
                        display="flex"
                        flexDirection="column"
                        height="100%"
                    >
                        <Box flex={1}>
                            {!eventData && (
                                <Skeleton mb={10} height={3} width={'80%'} />
                            )}

                            <Text
                                size="md"
                                color="purple.500"
                                fontWeight="600"
                                mb={2}
                                fontSize="13"
                            >
                                {eventData &&
                                    moment(eventData?.eventDate).format('llll')}
                            </Text>

                            <Heading size="lg" color="gray.600" mt={4}>
                                {eventData?.name}
                            </Heading>

                            {!eventData && (
                                <>
                                    <SkeletonText mt={3}></SkeletonText>
                                    <SkeletonText mt={3}></SkeletonText>
                                    <SkeletonText mt={3}></SkeletonText>
                                </>
                            )}

                            <Text mt={3}>{eventData?.description}</Text>
                        </Box>

                        {!eventData && <Skeleton height={70} width={'100%'} />}

                        {eventData && (
                            <>
                                <Text
                                    fontWeight="600"
                                    mt={3}
                                    fontSize="20"
                                    alignSelf="flex-end"
                                >
                                    <FontAwesomeIcon
                                        icon={faTicketAlt}
                                        color="#805ad5"
                                    />
                                    <Text
                                        ml={2}
                                        display="inline"
                                        color="purple.500"
                                    >
                                        {eventData?.price.toLocaleString(
                                            'pt-br',
                                            {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }
                                        )}
                                    </Text>
                                </Text>

                                <Button
                                    mt={4}
                                    variant="solid"
                                    px={5}
                                    py={7}
                                    bg="purple.500"
                                    color="white"
                                    type="submit"
                                    _hover={{ bg: 'purple.700' }}
                                >
                                    Quero um ingresso!
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box display="flex" p={10} px={'7%'}>
                <Box width="70%" pr={10}>
                    <Heading size="md" color="purple.500">
                        Sobre o evento
                    </Heading>

                    <Divider my={5} />

                    {!eventData &&
                        new Array(10)
                            .fill(null)
                            .map(() => <SkeletonText mt={3}></SkeletonText>)}

                    <Box
                        dangerouslySetInnerHTML={{
                            __html: eventData?.about || '',
                        }}
                    ></Box>
                </Box>

                {!eventData && (
                    <Box width="30%">
                        {new Array(3).fill(null).map(() => (
                            <SkeletonText mt={7}></SkeletonText>
                        ))}
                    </Box>
                )}

                <Box width="30%" hidden={!eventData}>
                    <Box mb={5}>
                        <Heading size="sm" color="gray.400">
                            Data do Evento
                        </Heading>
                        <Text>
                            {moment(eventData?.eventDate).format('lll')}
                        </Text>
                    </Box>

                    <Box mb={5}>
                        <Heading size="sm" color="gray.400">
                            Número de Participantes
                        </Heading>
                        <Text>{eventData?.totalParticipants} pessoas</Text>
                    </Box>

                    <Box mb={5}>
                        <Heading size="sm" color="gray.400">
                            Ingressos disponíveis
                        </Heading>
                        <Text>{eventData?.totalTickets} ingressos</Text>
                    </Box>

                    <Box mb={5}>
                        <Heading size="sm" color="gray.400">
                            Criado Por
                        </Heading>
                        <Text>
                            {eventData?.createdByUser?.name},{' '}
                            {moment(eventData?.createdAt).fromNow()}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
