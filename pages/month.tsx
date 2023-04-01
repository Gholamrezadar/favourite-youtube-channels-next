import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import useDataStore from '../lib/dataStore';

function SelectYear({ handleChange }: { handleChange: any }) {
  const minYear = useDataStore((state) => state.minYear)
  const maxYear = useDataStore((state) => state.maxYear)

  const [currentYear, setCurrentYear] = useState(maxYear)

  const handleChangeYear = (event: SelectChangeEvent) => {
    setCurrentYear(parseInt(event.target.value))
    handleChange(event.target.value.toString())
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
              <MenuItem value={maxYear - year} key={maxYear - year}>
                {maxYear - year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

function SelectMonth({MonthsLength, handleChange, selectedMonth}: { MonthsLength: number, handleChange: any, selectedMonth: string}) {

  const selectRef = useRef(null)
  const [currentMonth, setCurrentMonth] = useState("January")
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // When `selectedMonth` changes from the parent
  // because of a year change(month overflow), update
  // `currentMonth` in this component
  useEffect(() => {
    setCurrentMonth(selectedMonth)
  }, [selectedMonth])
  

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setCurrentMonth(event.target.value)
    handleChange(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentMonth.toString()}
          label="Month"
          onChange={handleChangeMonth}
        >
          {months.slice(0, MonthsLength).map((month) => {
            return (
              <MenuItem value={month} key={month}>
                {month}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

function BasicTable({ year, month }: { year: string, month: string }) {
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

const MonthPage: NextPage = () => {
  const [selectedYear, setselectedYear] = useState("2023")
  const [selectedMonth, setselectedMonth] = useState("January")
  const monthData = useDataStore((state) => state.monthData)
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  if(months.indexOf(selectedMonth) >= monthData.get(selectedYear)?.size) {
    setselectedMonth("January")
  }

  return (
    <Stack marginTop={4} alignItems={'center'} rowGap={2}>
      <Stack direction={'row'} alignItems={'center'} columnGap={2}>
        <SelectYear handleChange={setselectedYear} />
        <SelectMonth MonthsLength={monthData?.get(selectedYear)?.size} handleChange={setselectedMonth} selectedMonth={selectedMonth} />
      </Stack>
        
      <span className='table-title-text'>A total of <span className='num-videos-watched-label'>{monthData.get(selectedYear)?.get(selectedMonth)?.length}</span> videos watched in {selectedMonth} of {selectedYear}!</span>
      <BasicTable year={selectedYear} month={selectedMonth} />
    </Stack>)
}

export default MonthPage
