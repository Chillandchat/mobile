"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
//Importing packages
var express_1 = __importDefault(require("express"));
var authSchema_1 = __importDefault(require("./authSchema"));
var messageSchema_1 = __importDefault(require("./messageSchema"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var nodemailer_1 = __importDefault(require("nodemailer"));
//Setup dotenv
dotenv_1["default"].config();
//Setup express
var app = (0, express_1["default"])();
//Variables
var port = process.env.PORT || "8080";
//Db connection
mongoose_1["default"].connect(process.env.API_URI);
//Json middleware
app.use(express_1["default"].json());
//CORS middleware
app.use((0, cors_1["default"])({
    origin: ["http://localhost:3000", "https://chill-and-chat-web.web.app"]
}));
//Get endpoint
app.get("/", function (req, res) {
    res.status(401).send("REQUEST ERROR: PLEASE ENTER API KEY.");
});
//Get all message endpoint
app.get("/api/get_all_message", function (req, res) {
    try {
        //Search database
        messageSchema_1["default"]
            .find()
            .exec()
            .then(function (data) { return res.status(200).send(data); });
    }
    catch (err) {
        //Throw error
        res.status(500).send("SERVER ERROR: ".concat(err));
    }
});
//Create user endpoint
app.post("/api/sign_up", function (req, res) {
    try {
        //Create user element
        var newUser = new authSchema_1["default"]({
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            verified: req.body.verified,
            bot: req.body.bot,
            blocked: req.body.blocked
        });
        //Save database
        newUser.save().then(function () {
            res.status(201).send("Saved successfully, no errors and problems.");
        });
    }
    catch (err) {
        //Throw error
        res.status(500).send("SERVER ERROR: ".concat(err));
    }
});
//Find all users endpoint
app.get("/api/get_all_users", function (req, res) {
    try {
        //Search database
        authSchema_1["default"]
            .find()
            .exec()
            .then(function (data) { return res.status(200).send(data); });
    }
    catch (err) {
        //Throw error
        res.status(500).send("SERVER ERROR: ".concat(err));
    }
});
//Login endpoint
app.post("/api/login", function (req, res) {
    try {
        //Search database
        authSchema_1["default"]
            .findOne({ username: req.body.user })
            .exec()
            .then(function (data) {
            //Check if user exists
            if (data != null && data != undefined) {
                //Check password
                if (data.username == req.body.user &&
                    data.password == req.body.password)
                    /*Handle conditions:*/ res.status(200).send("User login success");
                else
                    res.status(400).send("Invalid password");
            }
            else
                res.status(404).send("User not found");
        })["catch"](function (err) {
            //Throw error
            res.status(500).send("SERVER ERROR: ".concat(err));
        });
    }
    catch (err) {
        //Throw error
        res.status(500).send("SERVER ERROR: ".concat(err));
    }
});
//Find user endpoint
app.get("/api/get_user/:user/", function (req, res) {
    try {
        //Find user
        authSchema_1["default"]
            .findOne({ username: req.params.user })
            .exec()
            .then(function (data) {
            //Check conditions
            if (data != null || data != undefined)
                res.status(200).send(data);
            /*Throw error:*/ else
                res.status(404).send("User not found");
        })["catch"](function (err) {
            //Throw error
            res.status(500).send("SERVER ERROR: ".concat(err));
        });
    }
    catch (err) {
        //Throw error
        res.status(500).send("SERVER ERROR: ".concat(err));
    }
});
app.post("/api/report_user", function (req, res) {
    //Email ok
    var emailOk = false;
    //Error message
    var error;
    //Transporter
    var transporter = nodemailer_1["default"].createTransport({
        service: "gmail",
        auth: {
            user: process.env.API_EMAIL,
            pass: process.env.API_EMAIL_PASS
        }
    });
    //Mail options
    var mailOptions = {
        from: process.env.API_EMAIL,
        to: "chengalvin333@gmail.com",
        subject: "You have a new report from the Chill&chat server",
        text: "".concat(req.body.user, " has reported ").concat(req.body.reportUser, "'s message.\nMessage: \"").concat(req.body.reason, "\"\n")
    };
    //Send mail
    transporter.sendMail(mailOptions, function (err, data) {
        //Check errors
        if (err) {
            error = err;
            emailOk = false;
        }
        else
            emailOk = true;
    });
    //Send status
    if (emailOk)
        res.status(200).send();
    else
        res.status(500).send("SERVER ERROR: ".concat(error));
});
//Block user endpoint
app.put("/api/block_user", function (req, res) {
    //Error variable
    var error = false;
    //Find and update user
    authSchema_1["default"]
        .findOneAndUpdate({ username: req.body.user })
        .exec()
        .then(function (data) {
        //Check conditions
        if (data != null || data != undefined) {
            try {
                //Change data
                data.blocked = req.body.blockedStatus;
                data.save();
            }
            catch (err) {
                //Throw error
                error = true;
            }
        } /*Throw error:*/
        else
            res.status(404).send("User not found");
        if (!error) /*Check conditions:*/
            res.status(200).send();
        //Reset status
        error = false;
    });
});
//Not found error handling
var notFound = function (req, res) {
    //Throw error
    res
        .status(404)
        .send("REQUEST ERROR: The page you requested was not found, please type a valid URL.");
};
app.use(notFound);
//Listen server on port
app.listen(port, function () {
    console.log("Server Ready and listening on port ".concat(port));
});
