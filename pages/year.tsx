import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type { NextPage } from 'next';
import { useState } from 'react';
import useDataStore from '../lib/dataStore';

function BasicSelect({ handleChange }: { handleChange: any }) {
  const minYear = useDataStore((state) => state.minYear);
  const maxYear = useDataStore((state) => state.maxYear);

  const [currentYear, setCurrentYear] = useState(maxYear);

  const handleChangeInner = (event: SelectChangeEvent) => {
    setCurrentYear(parseInt(event.target.value))
    handleChange(parseInt(event.target.value))
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentYear.toString()}
          label="Year"
          onChange={handleChangeInner}
        >
          {Array.from(Array(maxYear - minYear + 1).keys()).map((year) => {
            return (
              <MenuItem value={maxYear - year}>
                {maxYear - year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

function BasicTable({ year }: { year: any }) {
  const yearData = useDataStore((state) => state.yearData);

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
          {yearData.get(year)?.slice(0, 100).map((row, index) => (
            <TableRow
              key={row.channelName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left"><a href={row.channelUrl}>{row.channelName}</a></TableCell>
              <TableCell align="left">{row.numVideosWatched}</TableCell>
              <TableCell align="left">{(row.numVideosWatched / yearData.get(year)?.length*100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const YearPage: NextPage = () => {
  const [selectedYear, setselectedYear] = useState("2023")
  const yearData = useDataStore((state) => state.yearData)

  return (
    <Stack marginTop={4} alignItems={'center'} rowGap={2} >
      <BasicSelect handleChange={setselectedYear} />
      <span className='table-title-text'>A total of <span className='num-videos-watched-label'>{yearData.get(selectedYear)?.length}</span> videos watched in {selectedYear}!</span>
      <BasicTable year={parseInt(selectedYear)}/>
    </Stack>)
}

export default YearPage
