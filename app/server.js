const { allRouter } = require("./router/router");

module.exports = class Application {
    #express = require("express");
    #app = this.#express();
    constructor(PORT , DB_URL) {
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createRoutes();
        this.createServer(PORT);
        this.errorHandler();
    }

    configApplication () {

        const path = require("path");
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended : true}));
        this.#app.use(this.#express.static(path.join(__dirname , ".." , "public" )));

    }
    createServer (PORT) {

        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT , () => {
            console.log(`server run on port : http://localhost:${PORT}`);
        })

    }
    configDatabase (DB_URL) {

        const mongoose = require("mongoose");
        
        mongoose.connect(DB_URL , (error) => {
            if(error) console.log(error.message);
            return console.log("success connent to Data Base . . ." + DB_URL);
        });

    }
    errorHandler () {

        this.#app.use((req , res , next) => {
            return res.status(404).json({
                status : 404,
                success : false,
                message : "صفحه مورد نظر وجود ندارد"
            })
        })

        this.#app.use((err , req , res , next) => {
            const status = error?.status || 500;
            const message = error?.message || "internal server error";

            return res.status(status).json({
                status,
                success : false,
                message
            })

        })

    };
    createRoutes () {

        this.#app.get("/" , (req , res , next) => {
            return res.json({
                message : "this is new express application <<"
            })
        })

        this.#app.use(allRouter)
        // this.#app.use((err , req , res , next) => {
        //     try {
        //     } catch (error) {
        //         next(error)
        //     }
        // })

    }
}

