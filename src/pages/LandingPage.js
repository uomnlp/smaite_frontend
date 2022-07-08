/* eslint-disable */
import React, { useEffect, useState } from 'react';
import DrawerAppBar from "../components/DrawerAppBar.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/material/Button';

const api = require("../api.js");


const theme = createTheme({
  // palette: {
  //   primary: {
  //     light: '#757ce8',
  //     main: '#3f50b5',
  //     dark: '#002884',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: '#ff7961',
  //     main: '#f44336',
  //     dark: '#ba000d',
  //     contrastText: '#000',
  //   },
  // },
});

const LandingPage = (props) => {

  const [explanations, setExplanations] = useState()
  const [mode, setMode] = useState("generate")
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [textError, setTextError] = useState(null)

  
  const onsubmit = () => {
    setLoading(true)
    api.get('/myapi/fact_check?'+ new URLSearchParams({
      claim:text,
      mode:mode
  }))
      .then(async response=>{
        response = await response.json()
        setExplanations(response.explanations)
        setLoading(false)
      })
  }

  const handleChange = (value)=>{
    if(value.length < 5) setTextError("Input text should be atleast 5 characters long")
    else if(value.length > 20) setTextError("Input text should be at max 20 characters long")
    else setTextError(null)
    setText(value)
  }

    return (
    <>
    <ThemeProvider theme={theme}>
        <DrawerAppBar/>
        <Container  style={{ padding:50}}>
        <Container fixed style={{border:"solid 1px black", padding:50,borderRadius: "15px", textAlign:"center", margin:"20px"}}>
                <Typography variant="h4" gutterBottom component="div">
                FACT CHECKER
                </Typography>
                <br/>
                <FormControl>
                  <FormLabel id="mode">Mode</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="mode"
                    name="mode"
                    value={mode}
                    onChange={(e)=>setMode(e.target.value)}
                  >
                    <FormControlLabel value="generate" control={<Radio />} label="Generate" />
                    <FormControlLabel value="summarize" control={<Radio />} label="Summarize" />
                  </RadioGroup>
                </FormControl>
                <br/>
                <TextField error={textError !== null} helperText={textError} value={text} id="text" label="Input Text" variant="outlined" fullWidth  onChange={(e)=>handleChange(e.target.value)} />
                <br/>
                <br/>
                <LoadingButton variant="contained" loading={loading} endIcon={<SendIcon />} onClick={onsubmit} disabled={textError !== null || text.length == 0}>
                  Generate Results
                </LoadingButton>
                <br/>
                <br/>
                <br/>

                {typeof explanations === "undefined" ? null :<>
                  <Typography variant="overline" display="block" gutterBottom>
                  Result(s)
                  </Typography>
                  {explanations.map(explanation=>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                    {explanation}
                    </Typography>
                  )}
                  </>
                }
                
        </Container>
        </Container>
        </ThemeProvider>
    </>
    )
}

export default LandingPage;
