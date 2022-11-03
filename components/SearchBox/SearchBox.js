import React from 'react'
import { SearchIcon,VStack,Input,Icon } from 'native-base';

const SearchBox = () => {
  return (
    <VStack w="80%" space={5} alignSelf="center">
      <Input
        placeholder="Search Products"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<SearchIcon />}
          />
        }
      />
    </VStack>
  );
};


export default SearchBox
