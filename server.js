const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isWorkingDay = day >= 1 && day <= 5;
  const isWorkingHour = hour >= 9 && hour < 17;

  if (isWorkingDay && isWorkingHour) {
    next();
  } else {
    res
      .status(403)
      .send(
        "Application disponible uniquement du lundi au vendredi, de 9h à 17h"
      );
  }
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(checkWorkingHours);

app.get("/", (req, res) => {
  res.render("home", { title: "Accueil" });
});

app.get("/services", (req, res) => {
  res.render("services", { title: "Nos Services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Nous Contacter" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
