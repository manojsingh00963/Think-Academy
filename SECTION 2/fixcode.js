

// Three security vulnerabilities.

//  The code is not handling errors properly. logic should wrap in a try-catch block if not correct user it will throw an error.
// The code directly embeds user inputs (username, password) into the query,which is make it unsecured to SQL injection or other malicious attacks.
// Passwords are stored and compared as plaintext, which is unsafe and can expose user data if the database is hacked.




// Fixes Explanation 


// Error Handling:

// Wrapped the login logic in a try-catch block to handle errors and provide appropriate responses to the client.


// SQL Injection Protection:

// Replaced string interpolation with parameterized queries (?) to prevent SQL injection.

// Secure Password :

// Used bcrypt to securely hash and compare passwords, ensuring they are not stored as plaintext.

// Secure JWT Token:
// Replaced the hardcoded token with a dynamically generated JWT token using a secure secret key and set expiration for improved security and session control.



const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const db = require("./db"); // Assume this connects to a database

const app = express();
// jwt secreat key for improve the security
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
// Wrap the login in a try-catch block for error handling
    try {
        // Use parameterized queries to prevent SQL injection
        const user = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);

        if (user.length > 0) {
            // Compare hashed password using bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Generate secure JWT token and add the expiration time
                const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
                    expiresIn: "1h",
                });
                return res.json({ token });
            }
        }

        res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));

