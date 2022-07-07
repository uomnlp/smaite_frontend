/* eslint-disable */
import React, { useEffect, useState } from 'react';
import DrawerAppBar from "../components/DrawerAppBar.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';


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

  useEffect(()=>{
    api.get('/myapi/fact_check?'+ new URLSearchParams({
      claim: 'Arson is the reason for Bushfire'
  }))
      .then(async response=>{
        response = await response.json()
        setExplanations(response.explanations)
      })
  }, [])

    return (
    <>
    <ThemeProvider theme={theme}>
        <DrawerAppBar/>
        <Container  style={{ padding:50}}>
        <Container fixed style={{border:"solid 1px black", padding:50,borderRadius: "15px", textAlign:"center", margin:"20px"}}>
                <Typography variant="h4" gutterBottom component="div">
                FACT CHECKER
                </Typography>

                <Typography variant="overline" display="block" gutterBottom>
                Check your facts.
                </Typography>
                <br/>
                {typeof explanations === "undefined" ? 
                  <Alert severity={"info"}>Please wait.</Alert> :
                    explanations.map(explanation=> <p key={explanation}>{explanation}</p>)
                  }
                
        </Container>
        </Container>
        </ThemeProvider>
    </>
    )
}

export default LandingPage;
