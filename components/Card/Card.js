import React from 'react';
import {Box, Text, HStack, Flex, Center, ArrowForwardIcon} from 'native-base';
import { TouchableOpacity } from 'react-native';

const Card = ({amount, icon, title, hasCurrency, bgColor}) => {
  return (
    <Center>
      <Box w="70%" h={150} my={7}  bgColor={bgColor} position="relative" borderRadius="md">
        <Flex>
          <Box>
            <HStack p='0'>
              <Text fontSize="3xl" pl="4" bold color="#ffffff">
                {hasCurrency && '\u0024'}  
                {amount}
              </Text>
            </HStack>
            <Text fontSize="lg" pl="4" color="#ffffff">
              {title}
            </Text>
          </Box>
          <Box>{icon}</Box>
        </Flex>
        <TouchableOpacity>
        <Box bgColor="rgba(52, 52, 52, 0.1)" mt="12" h={7}>
          <Center>
            <HStack>
              <Text color="#ffffff">More Info</Text>
              {/* <ArrowForwardIcon pt='6' pl='7' size='sm'/> */}
            </HStack>
          </Center>
        </Box>
        </TouchableOpacity>
      </Box>
    </Center>
  );
};

export default Card;
