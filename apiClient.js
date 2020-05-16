const ApiConfig = require('./apiConfig');
const ReqPromise = require('request-promise');
const Timer = require("./timer");
const timer = new Timer();

class CmcApiClient{

    constructor() {
        }
        
    callTest(){

        // call option
        const callOption = {
            method: ApiConfig.cmcTestCall.METHOD,
            uri: ApiConfig.cmcTestCall.URL,
            qs: ApiConfig.cmcTestCall.QS,
            headers: ApiConfig.cmcTestCall.HEADERS,
            json: ApiConfig.cmcTestCall.JSON,
            gzip: ApiConfig.cmcTestCall.GZIP
        };

        // calling
        ReqPromise(callOption).then(response => {

            console.log(timer.getCurrentLocaltimeInIso()
            + ": " 
            + "Success - call " + ApiConfig.cmcTestCall.NAME
            + "."
            );

            // in case of successful calling, upload the data to mongoDB
            let data = {
                "status": response.status,
                "data": response.data,
                "uploadDtInUtc": new Date(Date.now()),
                "uploadDtInLocal": timer.getCurrentLocaltime()
            };

            collection01.insertOne(data, (error, result) => {
                if(error) {
                    console.log(timer.getCurrentLocaltimeInIso()
                    + ": " 
                    + "Fail - insert " + ApiConfig.cmcTestCall.NAME +" to DB: " + error.message
                    );
                }

                if(result.toString().length > 100)
                    result = result.toString().substring(0, 100) + "......";

                console.log(timer.getCurrentLocaltimeInIso()
                + ": " 
                + "Success - insert " + ApiConfig.cmcTestCall.NAME + " to DB: " + result
                );
            });
        // fail of calling
        }).catch((err) => {
            
            console.log(timer.getCurrentLocaltimeInIso()
            + ": " 
            + "Fail - call "+ ApiConfig.cmcTestCall.NAME + ": " + err.message
            );

        });
    }

    // function to call a coinMarketCap api
    callListingsLatest(){

        // call option
        const callOption = {
            method: ApiConfig.cmcListingsLatest.METHOD,
            uri: ApiConfig.cmcListingsLatest.URL,
            qs: ApiConfig.cmcListingsLatest.QS,
            headers: ApiConfig.cmcListingsLatest.HEADERS,
            json: ApiConfig.cmcListingsLatest.JSON,
            gzip: ApiConfig.cmcListingsLatest.GZIP
        };

        // calling
        ReqPromise(callOption).then(response => {

            console.log(timer.getCurrentLocaltimeInIso()
            + ": " 
            + "Success - call " + ApiConfig.cmcListingsLatest.NAME
            + "."
            );

            // in case of successful calling, upload the data to mongoDB
            let data = {
                "status": response.status,
                "data": response.data,
                "uploadDtInUtc": new Date(Date.now()),
                "uploadDtInLocal": timer.getCurrentLocaltime()
            };

            collection01.insertOne(data, (error, result) => {
                if(error) {
                    console.log(timer.getCurrentLocaltimeInIso()
                    + ": " 
                    + "Fail - insert "+ ApiConfig.cmcListingsLatest.NAME + " to DB: " + error.message
                    );
                }

                if(result.toString().length > 100)
                    result = result.toString().substring(0, 100) + "......";

                console.log(timer.getCurrentLocaltimeInIso()
                + ": " 
                + "Success - insert "+ ApiConfig.cmcListingsLatest.NAME + " to DB: "+ result
                );
            });
        // fail of calling
        }).catch((err) => {
            
            console.log(timer.getCurrentLocaltimeInIso()
            + ": " 
            + "Fail - calling " + ApiConfig.cmcListingsLatest.NAME + ": "+ err.message
            );

        });
    }
}

class KkApiClient{

    constructor() {




      }

}

module.exports = {
    CmcApiClient : CmcApiClient,
    KkApiClient : KkApiClient
  }