const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database");
require("dotenv").config();

const router = express.Router();

// Rota de registro
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (user) {
                return res.status(400).json({ message: "Usuário já existe" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).json({ message: "Erro ao registrar usuário" });
                }
                res.status(201).json({ message: "Usuário registrado com sucesso" });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
});

// Rota de login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (!user) {
                return res.status(400).json({ message: "Usuário não encontrado" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Senha inválida" });
            }

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ token });
        });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
});

module.exports = router;
