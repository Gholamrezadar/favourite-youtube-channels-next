import { Container, Stack } from '@mui/material'
import type { NextPage } from 'next'
import { useContext, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonAppBar from '../components/appbar'
import { DataContext } from '../components/context/DataContext'

function BasicTable() {
    const {overallData} = useContext(DataContext);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell align="left" width={'300px'}>Channel</TableCell>
                        <TableCell align="left">Videos Watched</TableCell>
                        <TableCell align="left">Percentage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {overallData.slice(0, 30).map((row, index) => (
                        <TableRow
                            key={row.channelName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="left">{row.channelName}</TableCell>
                            <TableCell align="left">{row.numVideosWatched}</TableCell>
                            <TableCell align="left">{row.numVideosWatched * 2}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const OverallPage: NextPage = () => {
    const {overallData} = useContext(DataContext);

    // useEffect(() => {
    //     console.log("Overall speaking...");
    //     console.log(overallData);
    // }, [])

    return (
    <Stack marginTop={4} alignItems={'center'} rowGap={2} >
        <span className='table-title-text'>A total of <span className='num-videos-watched-label'>{overallData.length}</span> videos watched!</span>
        <BasicTable />
    </Stack>)
}

export default OverallPage
