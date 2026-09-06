const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

app.use((req, res) => res.status(404).render("404", { title: "Página não encontrada" }));

module.exports = app;