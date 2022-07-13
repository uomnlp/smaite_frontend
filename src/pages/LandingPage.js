/* eslint-disable */
import React, { useState } from 'react';
import DrawerAppBar from "../components/DrawerAppBar.js";
import RelevantFacts from "../components/RelevantFacts.js";
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
import LoadingButton from '@mui/lab/LoadingButton';
import Zoom from '@mui/material/Zoom';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
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
  const [evidences, setEvidences] = useState()
  // const [mode, setMode] = useState("generate")

  // Button 1
  const [loading, setLoading] = useState(false)
  const [buttonOneVisible, setButtonOneVisible] = useState(true)
  const [relevantFacts, setRelevantFacts] = useState(null)

  // Button 2
  const [buttonTwoVisible, setButtonTwoVisible] = useState(true)

  // Input text
  const [textError, setTextError] = useState(null)
  const [claim, setClaim] = useState("")

  
  const checkClaim = () => {
    setButtonOneVisible(true)
    setButtonTwoVisible(false)
    setLoading(true)
    api.get('/myapi/fact_check?'+ new URLSearchParams({
      claim:claim,
      mode:"generate"
  }))
      .then(async response=>{
        response = await response.json()
        setExplanations(response.explanations)
        setEvidences(response.evidence)
        setLoading(false)
        setButtonOneVisible(false)
      })
  }

  const checkRelevantFacts = () => {
    setLoading(true)
    setExplanations()
    setRelevantFacts(null)
    setButtonTwoVisible(true)
    api.relevantClaimSearch(new URLSearchParams({
      query:claim
  }))
      .then(async response=>{
        response = await response.json()
        if(Object.keys(response).length == 0){
          checkClaim()
        }else{
          setRelevantFacts(response.claims)
          setLoading(false)
          setButtonOneVisible(false)
        }
      })
  }

  const handleChange = (value)=>{
    setButtonOneVisible(true)
    setLoading(false)
    if(value.length < 5) setTextError("Claim should be atleast 5 characters long")
    else if(value.length > 50) setTextError("Claim should be at max 50 characters long")
    else setTextError(null)
    setClaim(value)
  }

    return (
    <>
    <ThemeProvider theme={theme}>
        <DrawerAppBar/>
        <Container  style={{ padding:50}}>
          <Container fixed style={{border:"solid 1px black", padding:50,borderRadius: "15px", margin:"20px"}}>
            <div style={{ textAlign:"center"}}>
                  <Typography variant="h4" gutterBottom component="div">FACT CHECKER</Typography>
                  <br/><br/>
                  {/* <FormControl>
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
                  </FormControl> */}
                  <TextField error={textError !== null} helperText={textError} value={claim} id="claim" label="Claim" variant="outlined" fullWidth  onChange={(e)=>handleChange(e.target.value)} />
                  <br/><br/>
                  {buttonOneVisible && 
                    <Zoom in={buttonOneVisible}>
                    <LoadingButton variant="contained" loading={loading} endIcon={<SendIcon />} onClick={checkRelevantFacts} disabled={textError !== null || claim.length == 0}>Check Claim</LoadingButton>
                    </Zoom>
                  }
                  <br/><br/><br/>
                  {typeof explanations === "undefined" ? null :<>
                      <Grid container>
                        <Grid item md={1}></Grid>
                        <Grid item md={4}>
                          <Typography variant="button" display="block" gutterBottom>
                            EVIDENCE
                          </Typography>
                        </Grid>
                        <Grid item md={2}></Grid>
                        <Grid item md={4}>
                          <Typography variant="button" display="block" gutterBottom>
                            RESULTS
                          </Typography>
                        </Grid>
                        <Grid item md={1}></Grid>

                        <Grid item md={1}></Grid>
                        <Grid item md={4} style={{backgroundColor:"#755139", padding:"10px", boxShadow: "10px 10px 10px grey", textAlign:"left"}}>
                              {evidences.map(evidence=>
                                <Typography key={uuidv4()} variant="subtitle2" gutterBottom component="div" style={{marginBottom:"15px", color:"#f3edd7"}}>
                                
                                <Link href={evidence.url} underline="hover" style={{"cursor":"pointer", color:"#ffffff"}}>
                                  {evidence.title}
                                </Link>
                                </Typography>
                              )}
                        </Grid>
                        <Grid item md={2}></Grid>
                        <Grid item md={4} style={{backgroundColor:"#111820", padding:"10px", color:"#ffffff", boxShadow: "10px 10px 10px grey"}}>
                          
                            {explanations.map(explanation=>
                              <Typography  key={uuidv4()} variant="subtitle2" gutterBottom component="div" style={{marginBottom:"15px", color:"#f3aa4e"}}>
                              {explanation}
                              </Typography>
                            )}
                        </Grid>
                        <Grid item md={1}></Grid>
                      </Grid>
                      <br/><br/><br/><br/>
                    </>
                  }

            </div>
            <div>{relevantFacts !== null && <RelevantFacts buttonTwoVisible={buttonTwoVisible} checkClaim={checkClaim} key={uuidv4()} facts={relevantFacts} />}</div>
          </Container>
        </Container>
        </ThemeProvider>
    </>
    )
}

export default LandingPage;
