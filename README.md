# api-demo
API with authentication, 2 collections + web app


db = {
    etfs: [{
        ticker: "ABC",
        name: "iShares ABC"
    }, {
        ticker: "XYZ",
        name: "vanguard XYZ"
    }],
    advisors: [{
        name: "derek",
        firm: "IG"
    }, {
        name: "mike",
        firm: "RBC"
    }]
}


Your assignment is to create a REST API with bearer authentication and 2 collections, 
and to create a Java or Angular.js client (web app) that connects to that REST API, 
pushes new items and reads them afterwards.

As a last step, create an independent html page that uses Javascript / jQuery 
to login to the REST API, add a new product 
and request details from one of those added products

Once completed, simply send back the page you created and we will follow up with you!



** express API
https://api-demo-derlloyd.c9users.io/api/advisors
https://api-demo-derlloyd.c9users.io/api/etfs

post adds _id key/value pair to req.body object

[
    {
        _id: "5760c2c574f776f0c33c4509",
        ticker: "XIU",
        name: "iShares S&P/TSX 60 ETF"
    },
    {
        _id: "5760c30074f776f0c33c450a",
        ticker: "ZSP",
        name: "BMO S&P 500 ETF"
    },
    {
        _id: "5760dea1b4fb1f161a823387",
        name: "Company ABC ETF",
        ticker: "ABC",
        __v: 0
    }
]

** firebase API
https://api-demo-993ea.firebaseio.com/advisors.json
https://api-demo-993ea.firebaseio.com/etfs.json

post creates key and sets req.body object as value of that key
{
    0: {
        name: "BMO S&P 500 ETF",
        ticker: "ZSP"
    },
    1: {
        name: "iShares S&P/TSX 60 ETF",
        ticker: "XIU"
    },
    -KKLob-9ea6C1UNi9yCd: {
        name: "Company TTT ETF",
        ticker: "TTT"
    },
    -KKLqFlDBwSErSlnouOD: {
        name: "company abc",
        ticker: "abc"
    }
}

