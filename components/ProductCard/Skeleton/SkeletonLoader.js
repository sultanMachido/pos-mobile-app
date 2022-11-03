import React from 'react'
import {Box, Text, HStack,ZStack,Skeleton} from 'native-base';

const SkeletonLoader =()=>{
  return(
      <Box w="100%" h={150} my={7}   borderRadius="md" mb={10}>
         <HStack >
          <Box >
             <Skeleton flex="1" h="150" startColor="coolGray.100"/>
             <ZStack>
                <Skeleton.Text />
             </ZStack>
          </Box>   
          <Box pl={5}>
            <Skeleton.Text />
            <Skeleton.Text />
            <Skeleton.Text />
          </Box>
        </HStack> 
      </Box>
  )
}

export default SkeletonLoader