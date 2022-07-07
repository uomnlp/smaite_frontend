const config = {
    dev: {
        server: {
            host: 'http://localhost:5000'
        }
    },
    prod:{
        server:{
            host: ''
        }
    }
};

module.exports = (process.env.REACT_APP_ENV ? config[process.env.REACT_APP_ENV] : config["prod"]);
