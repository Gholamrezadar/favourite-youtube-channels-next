import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, CircularProgress, Stack } from '@mui/material';

import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { processData } from '../lib/dataUtils'
import useDataStore from '../lib/dataStore';

const Home: NextPage = () => {
  const [isFileRead, setIsFileRead] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [rawData, setRawData] = useState(null)

  const router = useRouter()

  // Zustand Store
  const setNumVideos = useDataStore(state => state.setNumVideos)
  const setMinYear = useDataStore(state => state.setMinYear)
  const setMaxYear = useDataStore(state => state.setMaxYear)
  const setOverallData = useDataStore(state => state.setOverallData)
  const setYearData = useDataStore(state => state.setYearData)

  // FileReader load handler
  const fileLoadHandler = (event: any) => {
    setRawData(JSON.parse(event.target.result));
    setIsFileRead(true);
    console.log(`File Loaded successfully`);
  }

  // File input change(upload) handler
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the uploaded file
    if (event.target.files === null) {
      alert("Files is empty");
      return;
    }

    // Wrong number of files
    if (event.target.files.length !== 1) {
      alert("Please select only one file");
      return;
    }

    // Get the uploaded file
    const file = event.target.files[0];
    // Read the file using the FileReader Api
    const reader = new FileReader();
    // 'File loaded' event listener
    reader.addEventListener('load', fileLoadHandler);
    // Read the selected file
    reader.readAsText(file);
  }

  // Process button handler
  const onButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsProcessing(true)
    // Process the raw data
    const { overallData, firstYear, lastYear, yearData } = await processData(rawData)
    
    // Fill zustand store
    setOverallData(overallData)
    setNumVideos(overallData.length)
    setMinYear(firstYear)
    setMaxYear(lastYear)
    setYearData(yearData)

    setIsProcessing(false)

    // Load successful => go to overallPage
    router.push("overall")
  }

  return (
    <>
      <Stack justifyContent={'center'} alignItems={'center'} rowGap={2} marginTop={4}>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} columnGap={2}>
          <span>Select <code>&apos;watch-history.json&apos;</code> : </span>
          <Button variant="outlined" component="label">
            Select
            <input hidden type="file" accept='application/JSON' onChange={onFileInputChange}></input>
          </Button>
        </Stack>

        {isFileRead &&
          <Button
            variant='contained'
            onClick={onButtonClick}
            endIcon={<UploadIcon />}>
            Process
          </Button>
        }

        {!isFileRead &&
          <Button
            disabled
            variant='contained'
            onClick={onButtonClick}
            endIcon={<UploadIcon />}>
            Process
          </Button>
        }

        {isProcessing &&
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        }


        <div style={{ color: '#ccc', textAlign: "center" }}><i><b>Safety note:</b> Your data wont be sent to any server.<br /> It remains on your device and gets processed offline.<br />You can even unplug your internet after this page has loaded to be sure.</i></div>
      </Stack>
    </>
  )
}

export default Home
