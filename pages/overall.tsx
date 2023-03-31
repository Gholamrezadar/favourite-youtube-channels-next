import { Container, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import ButtonAppBar from '../components/appbar';
import { DataContext } from '../components/context/DataContext';
import useDataStore from '../lib/dataStore';
import styles from '../styles/Home.module.css';

const BasicTable = ({setIsTableReady}) => {
    const overallData = useDataStore(state => state.overallData);

    useEffect(() => {
        setIsTableReady(true);
    }, [])
    

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
                    {overallData.slice(0, 200).map((row, index) => {
                        return (
                        <TableRow
                            key={row.channelName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="left"><a href={row.channelUrl}>{row.channelName}</a></TableCell>
                            <TableCell align="left">{row.numVideosWatched}</TableCell>
                            <TableCell align="left">{(row.numVideosWatched / overallData.length*100).toFixed(2)}%</TableCell>
                        </TableRow>)}
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const OverallPage: NextPage = () => {
    const numVideos = useDataStore(state => state.numVideos)
    const [isTableReady, setIsTableReady] = useState(false)

    return (
    <Stack marginTop={4} alignItems={'center'} rowGap={2} >
        <span className='table-title-text'>A total of <span className='num-videos-watched-label'>{numVideos}</span> videos watched!</span>

        {/* {!isTableReady && <span>Loading...</span>} */}
        <BasicTable setIsTableReady={(val) => {setIsTableReady(val)}}/>
    </Stack>)
}

export default OverallPage
