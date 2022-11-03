import React from 'react'
import { Heading,Text,Divider } from 'native-base'


const List = ({product})=>{
    return(
        <>
           <Heading>{product.name}</Heading>
           <Text>{product.price}</Text>
           <Text>{product.quantity}</Text>
           <Divider />
        </>
    )
}

export default List