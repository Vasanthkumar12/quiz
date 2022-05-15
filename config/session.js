const sessionConfig = {   		//Usuage
    secret: 'cse@nsit.edu.in',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // secure: true,
        maxAge: 7200000,
    }
}

module.exports = {sessionConfig};