const express = require("express");
const app = express();
var wd = require("word-definition");
const hbs = require("hbs");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/word", async (req, res) => {
    try {
        const word = req.body.word;

        const definition = await new Promise((resolve, reject) => {
            wd.getDef(word, "en", null, function (definition) {
                if (definition.error) {
                    reject(definition.error);
                } else {
                    resolve(definition);
                }
            });
        });

        // console.log(definition);

        res.render("index", {
            word: definition.word,
            category: definition.category,
            definition: definition.definition,
            err:definition.err
        });
    } catch (error) {
        res.render("index", {
            err: error
        });
    }
});

app.post("/reset",(req,res) => {
    res.redirect("/")
})

app.listen(4001, () => {
    console.log("server running on port no 4001")
})