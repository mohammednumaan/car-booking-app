// imports
const express = require("express");
const path = require("path");
const fs = require("fs");

// initializing a router to handle similar routes
// in this case its for the '/booking' prefix route
const router = express.Router();

router.get("/files/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "..", "files", filename);


    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`File not found: ${filePath}`);
            return res.status(404).json({ error: "File not found" });
        }
        res.sendFile(filePath, (sendErr) => {
            if (sendErr) {
                console.error(`Error sending file: ${sendErr}`);
                return res.status(500).json({ error: "Error sending file" });
            }
        });
    });
});
module.exports = router;