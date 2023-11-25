import './App.css'
import { useState, useEffect } from 'react'

//# Dev Import
import data from './data.json'

//# Chakra Import
import { Center } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import {
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


function App() {
  const [count, setCount] = useState(0)
  const [logHistory, setLogHistory] = useState({})


  useEffect(() => {
    // // Making an API call in React using axios
    // axios.get('https://api.example.com/data')
    //   .then(response => {
    //     // Save the data for later use, for example in state or context
    //     // this.setState({ data: response.data });
    //   })
    //   .catch(error => {
    //     // Handle any errors from the API call
    //   });
    console.log(data, JSON.stringify(data, null, 4))
    setLogHistory(data)
  }, []);

  return (
    <>
      <Grid w={'80vw'} templateColumns='repeat(10, 1fr)' gap={6} marginTop={'5%'} marginBottom={'5%'}>
        <GridItem colSpan={5} h='10vh' bg='blue.200' borderRadius='50em' >
          <Center h='100%'>
            <Stat>
              <StatLabel>Total Forms Received</StatLabel>
              <StatNumber>345,670</StatNumber>
            </Stat>
          </Center>
        </GridItem>
        <GridItem colSpan={5} h='10vh' bg='green.500' borderRadius='50em'>
          <Center h='100%'>
            <Stat>
              <StatLabel>Forms This Month</StatLabel>
              <StatNumber>12</StatNumber>
            </Stat>
          </Center>
        </GridItem>
      </Grid>

      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{data.Date}</Td>
              <Td>{data.Email}</Td>
              <Td>{data.Message}</Td>

              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

    </>
  )
}

export default App
