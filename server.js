// package
const BodyParser = require('body-parser');
const DbConfig = require('./dbConfig');
const ApiClient = require('./apiClient');
const Express = require('express');
const MongoClient = require("mongodb").MongoClient;
const Timer = require("./timer");

// constant variable
const app = Express();
const timer = new Timer();
const cmcApiClient = new ApiClient.CmcApiClient();
const kkApiClient = new ApiClient.KkApiClient();

// package for log
const fs = require('fs');
const util = require('util');
var log_file = fs.createWriteStream(__dirname + "/log" + "/log.log", {flags : "a"}); // 'a' means appending (old data will be preserved)
var log_stdout = process.stdout;

// function to overwrite the console.log, so as to log the console-context to a text file
console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

// app 
const port = 5001;
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// init in here
app.listen(port, ()=> {
   
    // kick the app
    console.log( timer.getCurrentLocaltimeInIso()
                + ": " 
                + "Server listening on port " + port + "."
                );

    // check DB connection
    MongoClient.connect(DbConfig.CONNECTION_URL, {useUnifiedTopology: true},
                                                {useNewUrlParser: true },
                                                (error, client) => {
        if(error) {

            console.log( timer.getCurrentLocaltimeInIso()
            + ": " 
            + "Fail to Connect DB `" 
            + DbConfig.DATABASE_NAME
            + "`.");

            throw error;
        }

        database = client.db(DbConfig.DATABASE_NAME);
        collection01 = database.collection(DbConfig.COLLECTION_No1);
        collection02 = database.collection(DbConfig.COLLECTION_No1);
        console.log( timer.getCurrentLocaltimeInIso()
        + ": " 
        + "Connected to DB:" + DbConfig.DATABASE_NAME
        + "`.");
    });
    
    // tes call
    //cmcApiClient.callTest();

    setInterval(cmcApiClient.callListingsLatest, 3600000); //time is in ms; 3600000 = 1hr
    
})

/*
app.get("/list", (request, res) =>{

    const requestOptions = {
        method: ApiConfig.cmcListingsLatest.METHOD,
        uri: ApiConfig.cmcListingsLatest.URL,
        qs: ApiConfig.cmcListingsLatest.QS,
        headers: ApiConfig.cmcListingsLatest.HEADERS,
        json: ApiConfig.cmcListingsLatest.JSON,
        gzip: ApiConfig.cmcListingsLatest.GZIP
    };

    ReqPromise(requestOptions).then(response => {
        console.log('Scuess - call CMC:', response);

        return res.json({ 
            response
        });
    }).catch((err) => {
        console.log('Fail - call CMC:', err.message);
    });


});

*/

