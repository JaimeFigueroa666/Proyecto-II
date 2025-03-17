require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;


const subscriptionRoutes = require("./routes/index"); // ou "./routes/webpush"
app.use(subscriptionRoutes);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});
