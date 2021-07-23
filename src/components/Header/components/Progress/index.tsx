import { Box, ChakraComponent, ChakraProps } from "@chakra-ui/react";

export const Progress = ({
  value,
  ...props
}: ChakraProps & { value: number }) => (
  <Box {...props} height="1">
    <Box
      height="1"
      bgColor="whatsapp.100"
      width={`${value}%`}
      transition="all 0.2s ease-in-out"
    />
  </Box>
);
