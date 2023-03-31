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
import useDataStore from '../lib/dataStore';

function SelectYear({ handleChange }: { handleChange: any }) {
  const minYear = useDataStore((state) => state.minYear)
  const maxYear = useDataStore((state) => state.maxYear)

  const [currentYear, setCurrentYear] = useState(maxYear)

  const handleChangeYear = (event: SelectChangeEvent) => {
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
          onChange={handleChangeYear}
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

function SelectMonth({ handleChange }: { handleChange: any }) {

  const [currentMonth, setCurrentMonth] = useState(0)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setCurrentMonth(months.indexOf(event.target.value))
    handleChange(parseInt(event.target.value))
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentMonth.toString()}
          label="Year"
          onChange={handleChangeMonth}
        >
          {months.map((month) => {
            return (
              <MenuItem value={month}>
                {month}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}


function BasicTable({ year, month }: { year: number, month: number }) {
  const monthData = useDataStore((state) => state.monthData)
  const currentMonthData = monthData.get(year)?.get(month)

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
          {currentMonthData?.slice(0, 100).map((row, index) => (
            <TableRow
              key={row.channelName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left"><a href={row.channelUrl}>{row.channelName}</a></TableCell>
              <TableCell align="left">{row.numVideosWatched}</TableCell>
              <TableCell align="left">{(row.numVideosWatched / currentMonthData?.length * 100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const YearPage: NextPage = () => {
  const [selectedYear, setselectedYear] = useState(2023);
  const [selectedMonth, setselectedMonth] = useState(0);
  const { yearData } = useContext(DataContext);

  return (
    <Stack marginTop={4} alignItems={'center'} rowGap={2} >
      <SelectYear handleChange={setselectedYear} />
      <SelectYear handleChange={setselectedMonth} />
      <span className='table-title-text'>A total of <span className='num-videos-watched-label'>{yearData.get(selectedYear)?.length}</span> videos watched in {selectedYear}!</span>
      <BasicTable year={selectedYear} month={selectedMonth} />
    </Stack>)
}

export default YearPage
