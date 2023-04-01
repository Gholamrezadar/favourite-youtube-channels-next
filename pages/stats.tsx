import { Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useDataStore from '../lib/dataStore';

const BasicTable = ({ setIsTableReady }) => {
    const rewatchData = useDataStore(state => state.rewatchData);

    useEffect(() => {
        setIsTableReady(true);
    }, [setIsTableReady])


    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell align="left">Channel</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rewatchData.slice(0, 100).map((row, index) => {
                        return (
                            <TableRow
                                key={row.channelName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left"><a href={row.channelUrl}>{row.channelName}</a></TableCell>
                                <TableCell align="left">
                                    <a href={row.videoUrl} className='blue-link'>
                                        {row.videoTitle.replace("Watched ", "")}
                                    </a>
                                </TableCell>
                                <TableCell align="left">{row.watchCount}</TableCell>
                            </TableRow>)
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const OverallPage: NextPage = () => {
    const [isTableReady, setIsTableReady] = useState(false)

    return (
        <Stack marginTop={4} alignItems={'center'} rowGap={2} >
            {/* <span className='table-title-text'>A total of <span className='num-videos-watched-label'>{numVideos}</span> videos watched!</span> */}

            {!isTableReady && <span>Loading...</span>}
            <BasicTable setIsTableReady={(val) => { setIsTableReady(val) }} />
        </Stack>)
}

export default OverallPage
