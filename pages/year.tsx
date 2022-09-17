import { Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import ButtonAppBar from '../components/appbar'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataContext } from '../components/context/DataContext';

function BasicSelect({ handleChange }: { handleChange: any }) {
  const [yearState, setYearState] = useState('2022');

  const handleChangeInner = (event: SelectChangeEvent) => {
    setYearState(event.target.value as string);
    handleChange(parseInt(event.target.value as string));
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={yearState}
          label="Year"
          onChange={handleChangeInner}
        >
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2015}>2015</MenuItem>
          <MenuItem value={2014}>2014</MenuItem>
          <MenuItem value={2013}>2013</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function BasicTable({ year }: { year: any }) {
  const { yearData } = useContext(DataContext);

  return (
    <TableContainer component={Paper} >
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
          {yearData.get(year)?.slice(0, 30).map((row, index) => (
            <TableRow
              key={row.channelName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
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

const YearPage: NextPage = () => {
  const [selectedYear, setselectedYear] = useState(2022);
  const { yearData } = useContext(DataContext);

  return (
    <Stack marginTop={4} alignItems={'center'} rowGap={2} >
      <BasicSelect handleChange={setselectedYear} />
      <span className='table-title-text'>A total of <span className='num-videos-watched-label'>{yearData.get(selectedYear)?.length}</span> videos watched in {selectedYear}!</span>
      <BasicTable year={selectedYear}/>
    </Stack>)
}

export default YearPage
