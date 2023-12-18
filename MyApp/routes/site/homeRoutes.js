const express = require("express");
let router = express.Router();

const ejs = require('ejs');
const pdf = require('html-pdf');
const {postContactMessage} = require("../../functions/postContactMessage");


router.get("/", (req, res)=> {
  req.session.myRequestedRoute = "/";
  res.render('landing_page');
});

router.get("/cv", (req, res)=> {
  req.session.myRequestedRoute = "/cv";
  res.render('cv/cvPage');
});

router.get('/download-cv-pdf', (req, res) => {
    ejs.renderFile('views/cv/cvPage.ejs', { /* Pass data if needed */ }, (err, html) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        const pdfOptions = {
            format: 'Letter',
            border: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in'
            }
        };

        pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
            res.setHeader('Content-Type', 'application/pdf');
            res.send(buffer);
        });
    });
});

router.post("/contact", async (req, res) => {
  try {
    console.log("I am in posting contact message...");
    await postContactMessage(req, res, req.body.name, req.body.email, req.body.phone, req.body.message);
    return;
  } catch (error) {
    console.error("Error occur while placing user order: ", error);
  }
});

module.exports = router;