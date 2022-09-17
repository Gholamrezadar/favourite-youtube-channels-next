import Button from '@mui/material/Button'
import UploadIcon from '@mui/icons-material/Upload';
import Stack from '@mui/material/Stack'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useRef, useState } from 'react'
import { DataContext } from '../components/context/DataContext'
import { getOverallChannels, getYearChannels } from '../lib/dataUtils'


const Home: NextPage = () => {
  const fileSelectorEl = useRef(null);
  const uploadButtonEl = useRef(null);
  const router = useRouter();
  const { setOverallData, setYearData, setMinYear, setMaxYear, title } = useContext(DataContext);

  let reader: FileReader;
  let file: File;
  const [isFileRead, setIsFileRead] = useState(false)
  const [data, setData] = useState(null)


  const fileLoadHandler = (event: any) => {
    // Parse the json file
    // try {
    setData(JSON.parse(event.target.result));
    console.log("data")
    console.log(data)
    setIsFileRead(true);
    console.log(`File Loaded successfully`);
    // } catch (error) {
    // console.log(`Failed loading the file`);
    // alert("Couldn't load the selected file. Please try again.")
    // }

  }

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // if (isFileRead) {
    // Update the data in th
    console.log(data)
    const { overallData, firstYear, lastYear } = getOverallChannels(data);
    setOverallData(overallData);
    setMinYear(firstYear);
    setMaxYear(lastYear);
    const yearData = getYearChannels(data);
    setYearData(yearData);
    // Load successful => go to overallPage
    router.push("overall");

    // }
    // else {
    // alert("File not read yet");
    // }

  }

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the uploaded file
    if (event.target.files !== null) {
      // Wrong number of files
      if (event.target.files.length !== 1) {
        console.log("Please select only one file");
        return;
      }
      // OK
      else {
        // Get the uploaded file
        file = event.target.files[0];
        // Read the file using the FileReader Api
        reader = new FileReader();
        // 'File loaded' event listener
        reader.addEventListener('load', fileLoadHandler);
        // Read the selected file
        reader.readAsText(file);
      }
    }
    // files is null
    else {
      console.log("Files is empty");
      return;
    }
  }

  return (
    <>
      <Stack justifyContent={'center'} alignItems={'center'} rowGap={2} marginTop={4}>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} columnGap={2}>
          <span>Select <code>&apos;watch-history.json&apos;</code> : </span>
          <Button variant="outlined" component="label">
            Select
            <input hidden type="file" accept='application/JSON' ref={fileSelectorEl} onChange={onFileInputChange}></input>
          </Button>
        </Stack>

        {isFileRead
          ?
          <Button variant='contained' ref={uploadButtonEl} onClick={onButtonClick} endIcon={<UploadIcon />}>Upload</Button>
          :
          <Button disabled variant='contained' ref={uploadButtonEl} onClick={onButtonClick} endIcon={<UploadIcon />}>Upload</Button>
        }
        {/* <Button variant='contained' ref={uploadButtonEl} onClick={onButtonClick} endIcon={<UploadIcon />}>Upload</Button> */}

        <div style={{ color: '#ccc', textAlign: "center" }}><i><b>Safety note:</b> Your data wont be sent to any server.<br /> It remains on your device and gets processed offline.<br />You can even unplug your internet after this page has loaded to be sure.</i></div>
      </Stack>
    </>
  )
}

export default Home
