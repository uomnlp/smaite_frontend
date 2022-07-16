const config = {
    dev: {
        server: {
            host: 'http://localhost:5000'
        },
        fact_api_path : 'https://factchecktools.googleapis.com/v1alpha1/claims:search',
        fact_api_key: "AIzaSyCrhF3JQ_rbEpv1j9rXhUjNypjlrBbmJ2Y"
    },
    prod:{
        server:{
            host: 'http://localhost:8000'
        },
        fact_api_path : 'https://factchecktools.googleapis.com/v1alpha1/claims:search',
        fact_api_key: "AIzaSyCrhF3JQ_rbEpv1j9rXhUjNypjlrBbmJ2Y"
    }
};

module.exports = (process.env.REACT_APP_ENV ? config[process.env.REACT_APP_ENV] : config["prod"]);
