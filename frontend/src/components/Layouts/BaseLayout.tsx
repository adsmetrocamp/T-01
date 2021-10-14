import { Box } from '@chakra-ui/layout';
import React, { ReactNode } from 'react';
import { AppBar } from './AppBar';

interface Props {
  children: ReactNode;
}

export const BaseLayout = (props: Props) => {
  return (
    <Box>
      <AppBar />

      <Box pt={'85px'}>{props.children}</Box>
    </Box>
  );
};
