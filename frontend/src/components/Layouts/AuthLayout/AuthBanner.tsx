import { Box } from "@chakra-ui/react";
import React from "react";

import LoginBackground from "../../../assets/images/login-background.jpg";

interface Props {}

export const AuthBanner = (props: Props) => {
  return (
    <Box height="100%" flex={0.8} bg="purple.300" bgImage={LoginBackground} bgSize="cover" bgPosition="center center">
      <Box width="100%" height="100%" bg="purple.300" opacity={0.6}></Box>
    </Box>
  );
};
