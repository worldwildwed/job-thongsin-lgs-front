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


function MyTable() {
    return (
        <>
            <h1>Hello World</h1>
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
        </>

    )

    // return <TableContainer>
    //     <Table variant='simple'>
    //         <TableCaption>Imperial to metric conversion factors</TableCaption>
    //         <Thead>
    //             <Tr>
    //                 <Th>Date</Th>
    //                 <Th>Email</Th>
    //                 <Th>Message</Th>
    //                 <Th isNumeric>multiply by</Th>
    //             </Tr>
    //         </Thead>
    //         <Tbody>
    //             <Tr>
    //                 <Td>{data.Date}</Td>
    //                 <Td>{data.Email}</Td>
    //                 <Td>{data.Message}</Td>

    //                 <Td isNumeric>25.4</Td>
    //             </Tr>
    //             <Tr>
    //                 <Td>feet</Td>
    //                 <Td>centimetres (cm)</Td>
    //                 <Td isNumeric>30.48</Td>
    //             </Tr>
    //             <Tr>
    //                 <Td>yards</Td>
    //                 <Td>metres (m)</Td>
    //                 <Td isNumeric>0.91444</Td>
    //             </Tr>
    //         </Tbody>
    //         <Tfoot>
    //             <Tr>
    //                 <Th>To convert</Th>
    //                 <Th>into</Th>
    //                 <Th isNumeric>multiply by</Th>
    //             </Tr>
    //         </Tfoot>
    //     </Table>
    // </TableContainer>
}

export default MyTable;