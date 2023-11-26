import { useState, useEffect } from 'react'
import {
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Center,
    Button,
    IconButton
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Pagination from 'react-bootstrap/Pagination';

const ROW_PER_PAGE = 50

function CPagination({ currentPage = 1, setCurrentPage, allData }) {
    const totalPages = Math.ceil(allData.length / ROW_PER_PAGE)

    const updateCurrentPage = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    return (
        <Pagination>
            {Array.from(Array(totalPages).keys()).map(i => {
                if (i + 1 == currentPage) {
                    return <Pagination.Item key={`page-${i + 1}`} onClick={() => updateCurrentPage(i + 1)} active>{i + 1}</Pagination.Item>
                }
                else {
                    return <Pagination.Item key={`page-${i + 1}`} onClick={() => updateCurrentPage(i + 1)}>{i + 1}</Pagination.Item>
                }
            })}
        </Pagination>
    )
}

function CMessageRow({ message }) {
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure()
    return (
        <Td>
            {/* <Button onMouseEnter={onOpen} >o</Button> */}
            <IconButton
                isRound={true}
                variant='solid'
                colorScheme='teal'
                aria-label='Done'
                fontSize='10px'
                icon={!isOpen ? <ViewIcon /> : <ViewOffIcon />}
                onClick={onOpen}
            />
            <AlertDialog
                motionPreset='slideInBottom'
                // leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Full Message</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {message}
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </Td>
    )
}

function CTable({ data }) {

    const [currentPage, setCurrentPage] = useState(1)
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure()

    useEffect(() => {
        console.log('[ CTable useEffect ]', JSON.stringify(data, null, 4))

    }, [data])

    return (
        <>
            <TableContainer overflowX={'auto'} overflowY={'auto'} paddingLeft={'10%'} paddingRight={'10%'} maxHeight={'70vh'} minHeight={'70vh'}>
                <Table variant='striped'>
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Phone</Th>
                            <Th>Email</Th>
                            <Th>Company</Th>
                            <Th>Purpose</Th>
                            <Th>Message</Th>
                            <Th>View</Th>
                            <Th>Date</Th>
                            {/* <Th>TimeStamp</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.slice((currentPage - 1) * ROW_PER_PAGE, currentPage * ROW_PER_PAGE).map((d, i) =>
                            <Tr key={`row-${i}`}>
                                <Td>{d.name}</Td>
                                <Td>{d.phone}</Td>
                                <Td>{d.email}</Td>
                                <Td>{d.company_name}</Td>
                                <Td>{d.purpose.slice(0, 1) == '1' ? 'ติดต่อทั่วไป' : d.purpose.slice(0, 1) == '2' ? 'ขอใบเสนอราคา' : ''}</Td>
                                <Td w={'30vw'} >{d.message.length > 100 ? d.message.slice(0, 50) : d.message}</Td>
                                <CMessageRow message={d.message} />
                                <Td>{d.date_string}</Td>
                                {/* <Td>{d.createdAt}</Td> */}
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer >
            <Center pos='fixed' bottom='0' left='50%'>
                <CPagination currentPage={currentPage} setCurrentPage={setCurrentPage} allData={data} />
            </Center>
        </>

    )
}

export default CTable;