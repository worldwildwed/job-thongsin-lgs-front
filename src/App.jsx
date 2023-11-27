import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

//# Dev Import
// import data from './data.json'

//# Chakra Import
import { Box, Center, Input } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import {
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import CTable from './components/CTable'

const IS_PROD = true
const APP_PASSWORD = '12341234'
const TTL = 15 * 60000


function App() {
  // DEFINE currentMonth for filter reference
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  // App States
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [logHistory, setLogHistory] = useState([])
  const [logHistoryThisMonth, setlogHistoryThisMonth] = useState([])

  const handlePassword = (password) => {
    if (password == APP_PASSWORD) {
      //! Set Storage When Password & ExpiredTime Is Matched
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('isLoggedInExpiredAt', Date.now() + TTL);
      console.log('[local storage]: set isLoggedIn')
      setIsLoggedIn(true)
    }
  }

  useEffect(() => {
    const callAllLogs = async () => {
      try {
        let _res = await axios.get(IS_PROD ? 'http://15.235.187.133:3773/alllogs' : 'https://logservice.fussu.tech/alllogs')
        // console.log(typeof _res.data[0].createdAt)
        // const dateTime = new Date(_res.data[0].createdAt);
        // console.log('[ createdAt ]: ', dateTime, typeof dateTime)
        // console.log('resp:', _res.data)
        setLogHistory(_res.data)

        const logThisMonth = _res.data.filter((log, i) => {
          const caDateTime = new Date(log.createdAt)
          if (caDateTime.getMonth() + 1 == currentMonth) {
            return log
          }
        })
        setlogHistoryThisMonth(logThisMonth)
      } catch (err) {
        console.log(err.message)
      }
    }
    callAllLogs()
  }, []);

  return <>
    {localStorage.getItem('isLoggedIn') && Date.now() < localStorage.getItem('isLoggedInExpiredAt') ? <>
      <Box h={'100vh'} w='100vw' bg='blue.300'>
        <Center>
          <Grid w={'80vw'} templateColumns='repeat(10, 1fr)' gap={6} marginTop={'5%'} marginBottom={'2%'}>
            <GridItem colSpan={5} h='10vh' bg='blue.200' borderRadius='50em' >
              <Center h='100%'>
                <Stat>
                  <StatLabel>Total Forms Received</StatLabel>
                  <StatNumber>{logHistory.length}</StatNumber>
                </Stat>
              </Center>
            </GridItem>
            <GridItem colSpan={5} h='10vh' bg='green.500' borderRadius='50em'>
              <Center h='100%'>
                <Stat>
                  <StatLabel>Forms This Month</StatLabel>
                  <StatNumber>{logHistoryThisMonth.length}</StatNumber>
                </Stat>
              </Center>
            </GridItem>
          </Grid>
        </Center>
        <CTable data={logHistory} />
      </Box>
    </> : <Box h='100vh' w='100vw' bg='blue.400'>
      <Center w='100%' h='100%' paddingLeft={'20%'} paddingRight={'20%'}><Input
        size='lg'
        pr='4.5rem'
        type='password'
        variant='filled'
        // type={show ? 'text' : 'password'}
        placeholder='~ hi'
        onChange={(event) => handlePassword(event.target.value)}
      /></Center>
    </Box>
    }
  </>



}

export default App
