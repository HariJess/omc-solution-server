// server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

// Configuration de CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurer Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Assurez-vous que le dossier de destination existe
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Conservez le nom d'origine du fichier
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Configurer nodemailer
const transporter = nodemailer.createTransport({
  // service: "gmail", // ou tout autre service de messagerie
  // auth: {
  //   user: "hjess3725@gmail.com",
  //   // pass: "harijess102006",
  //   pass: "itnpbmiqlxahwtoy",
  // },
  host: "pro3.mail.ovh.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Créer le dossier 'uploads' si nécessaire
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Endpoint pour gérer le téléversement de fichiers
app.post(
  "/upload",
  upload.fields([{ name: "fileCV" }, { name: "fileMotivation" }]),
  async (req, res) => {
    const { name, firstname, email, entreprise, telephone, objet, message } =
      req.body;
    const files = req.files;

    // console.log("Files:", files);
    // Préparer les pièces jointes
    const attachments = [
      files["fileCV"]
        ? {
            filename: files["fileCV"][0].originalname,
            path: files["fileCV"][0].path,
          }
        : null,
      files["fileMotivation"]
        ? {
            filename: files["fileMotivation"][0].originalname,
            path: files["fileMotivation"][0].path,
          }
        : null,
    ].filter(Boolean); // Filtrer les valeurs nulles

    const cssPath = path.join(__dirname, "email_temp.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Préparer le message
    const mailOptions = {
      from: '"Client support"<elyse.randrianasolo@omc-solutions.fr>',
      to: "hjess3725@gmail.com, ismaelrazafindramboly@gmail.com, mahatsirygrafike@gmail.com",
      subject: `${objet}`,
      html: `<p>&nbsp;</p>
<style type="text/css">
${cssContent}
</style>
<div
  class="es-wrapper-color"
  dir="ltr"
  lang="fr"
  style="background-color: #ffffff"
>
  <table
    class="es-wrapper"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      background-repeat: repeat;
      background-position: center top;
      background-color: #ffffff;
    "
    role="none"
    width="100%"
    cellspacing="0"
    cellpadding="0"
  >
    <tbody>
      <tr>
        <td style="padding: 0; margin: 0" valign="top">
          <table
            class="es-content"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              width: 100%;
              table-layout: fixed !important;
            "
            role="none"
            cellspacing="0"
            cellpadding="0"
            align="center"
          >
            <tbody>
              <tr>
                <td style="padding: 0; margin: 0" align="center">
                  <table
                    class="es-content-body"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #efefef;
                      border-radius: 20px 20px 0 0;
                      width: 600px;
                    "
                    role="none"
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    bgcolor="#efefef"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            padding: 0;
                            margin: 0;
                            padding-right: 40px;
                            padding-left: 40px;
                            padding-top: 40px;
                          "
                          align="left"
                        >
                          <table
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                            role="none"
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="padding: 0; margin: 0; width: 520px"
                                  align="center"
                                  valign="top"
                                >
                                  <table
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                    role="presentation"
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          class="es-m-txt-c"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 0px;
                                          "
                                          align="left"
                                        >
                                          <a
                                            style="
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #2d3142;
                                              font-size: 18px;
                                            "
                                            href="https://viewstripo.email"
                                            target="_blank"
                                            rel="noopener"
                                            ><img
                                              style="
                                                display: block;
                                                font-size: 18px;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                border-radius: 100px;
                                              "
                                              title="Confirm email"
                                              src="https://eyhpox.stripocdn.email/content/guids/CABINET_ee77850a5a9f3068d9355050e69c76d26d58c3ea2927fa145f0d7a894e624758/images/group_4076323.png"
                                              alt="Confirm email"
                                              width="100"
                                          /></a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 0;
                            margin: 0;
                            padding-top: 20px;
                            padding-right: 40px;
                            padding-left: 40px;
                          "
                          align="left"
                        >
                          <table
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                            role="none"
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="padding: 0; margin: 0; width: 520px"
                                  align="center"
                                  valign="top"
                                >
                                  <table
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: separate;
                                      border-spacing: 0px;
                                      background-color: #fafafa;
                                      border-radius: 10px;
                                    "
                                    role="presentation"
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    bgcolor="#fafafa"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="padding: 20px; margin: 0"
                                          align="left"
                                        >
                                          <h3
                                            style="
                                              margin: 0;
                                              font-family: Imprima, Arial,
                                                sans-serif;
                                              mso-line-height-rule: exactly;
                                              letter-spacing: 0;
                                              font-size: 28px;
                                              font-style: normal;
                                              font-weight: bold;
                                              line-height: 34px;
                                              color: #2d3142;
                                            "
                                          >
                                            Bonjour,
                                          </h3>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: Imprima, Arial,
                                                sans-serif;
                                              line-height: 27px;
                                              letter-spacing: 0;
                                              color: #2d3142;
                                              font-size: 18px;
                                            "
                                          >
                                            &nbsp;
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: Imprima, Arial,
                                                sans-serif;
                                              line-height: 27px;
                                              letter-spacing: 0;
                                              color: #2d3142;
                                              font-size: 18px;
                                            "
                                          >
                                            Vous avez re&ccedil;u un nouveau
                                            message de ${name}
                                            ${firstname}:&nbsp;<br /><br /><em
                                              >${message}</em
                                            >.
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: Imprima, Arial,
                                                sans-serif;
                                              line-height: 27px;
                                              letter-spacing: 0;
                                              color: #2d3142;
                                              font-size: 18px;
                                            "
                                          >
                                            Cordialement,<br />${firstname}
                                            ${name}<br />${entreprise}.
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="es-content"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              width: 100%;
              table-layout: fixed !important;
            "
            role="none"
            cellspacing="0"
            cellpadding="0"
            align="center"
          >
            <tbody>
              <tr>
                <td style="padding: 0; margin: 0" align="center">
                  <table
                    class="es-content-body"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #efefef;
                      border-radius: 0 0 20px 20px;
                      width: 600px;
                    "
                    role="none"
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    bgcolor="#efefef"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="esdev-adapt-off"
                          style="margin: 0; padding: 20px 40px 20px 40px"
                          align="left"
                        >
                          <table
                            class="esdev-mso-table"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                              width: 520px;
                            "
                            role="none"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="esdev-mso-td"
                                  style="padding: 0; margin: 0"
                                  valign="top"
                                >
                                  <table
                                    class="es-left"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                      float: left;
                                    "
                                    role="none"
                                    cellspacing="0"
                                    cellpadding="0"
                                    align="left"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            width: 47px;
                                          "
                                          align="center"
                                          valign="top"
                                        >
                                          <table
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                            role="presentation"
                                            width="100%"
                                            cellspacing="0"
                                            cellpadding="0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  class="es-m-txt-l"
                                                  style="
                                                    padding: 0;
                                                    margin: 0;
                                                    font-size: 0px;
                                                  "
                                                  align="center"
                                                >
                                                  <a
                                                    style="
                                                      mso-line-height-rule: exactly;
                                                      text-decoration: underline;
                                                      color: #2d3142;
                                                      font-size: 18px;
                                                    "
                                                    href="https://viewstripo.email"
                                                    target="_blank"
                                                    rel="noopener"
                                                    ><img
                                                      style="
                                                        display: block;
                                                        font-size: 18px;
                                                        border: 0;
                                                        outline: none;
                                                        text-decoration: none;
                                                      "
                                                      title="Demo"
                                                      src="https://eyhpox.stripocdn.email/content/guids/CABINET_72f9d66a77177fdcf3ab52f5636b6d21cd04cdfdf19015f1530ba464ad66a00c/images/contact.png"
                                                      alt="Demo"
                                                      width="47"
                                                  /></a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td style="padding: 0; margin: 0; width: 20px">
                                  &nbsp;
                                </td>
                                <td
                                  class="esdev-mso-td"
                                  style="padding: 0; margin: 0"
                                  valign="top"
                                >
                                  <table
                                    class="es-right"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                      float: right;
                                    "
                                    role="none"
                                    cellspacing="0"
                                    cellpadding="0"
                                    align="right"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            width: 453px;
                                          "
                                          align="center"
                                          valign="top"
                                        >
                                          <table
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                            role="presentation"
                                            width="100%"
                                            cellspacing="0"
                                            cellpadding="0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="padding: 0; margin: 0"
                                                  align="left"
                                                >
                                                  <p
                                                    style="
                                                      margin: 0;
                                                      mso-line-height-rule: exactly;
                                                      font-family: Imprima,
                                                        Arial, sans-serif;
                                                      line-height: 24px;
                                                      letter-spacing: 0;
                                                      color: #2d3142;
                                                      font-size: 16px;
                                                    "
                                                  >
                                                    Numero : ${telephone}<br />Email:
                                                    ${email}
                                                  </p>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`,
      // text: `Bonjour, vous avez recu un message de ${name} ${firstname}\n${message}\nEmail: ${email}\nEntreprise: ${entreprise}\nTéléphone: ${telephone}`,
      attachments: attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "success!" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'envoi des e-mails!" });
      console.error("Error sending email:", error);
    }
  }
);

// Middleware pour les routes inexistantes (404)
app.use((req, res, next) => {
  res.status(404).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Error Page</title>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700');
    @import url('https://fonts.googleapis.com/css?family=Catamaran:400,800');
    .error-container {
      text-align: center;
      font-size: 106px;
      font-family: 'Catamaran', sans-serif;
      font-weight: 800;
      margin: 70px 15px;
    }
    .error-container > span {
      display: inline-block;
      position: relative;
    }
    .error-container > span.four {
      width: 136px;
      height: 43px;
      border-radius: 999px;
      background: linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%), linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%), linear-gradient(to right, #d89ca4, #e27b7e);
    }
    .error-container > span.four:before, .error-container > span.four:after {
      content: '';
      display: block;
      position: absolute;
      border-radius: 999px;
    }
    .error-container > span.four:before {
      width: 43px;
      height: 156px;
      left: 60px;
      bottom: -43px;
      background: linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%), linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%), linear-gradient(to top, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
    }
    .error-container > span.four:after {
      width: 137px;
      height: 43px;
      transform: rotate(-49.5deg);
      left: -18px;
      bottom: 36px;
      background: linear-gradient(to right, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
    }
    .error-container > span.zero {
      vertical-align: text-top;
      width: 156px;
      height: 156px;
      border-radius: 999px;
      background: linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%, transparent 51%, transparent 100%), linear-gradient(to top right, #99749D, #99749D, #B895AB, #CC9AA6, #D7969E, #ED8687, #ED8687);
      overflow: hidden;
      animation: bgshadow 5s infinite;
    }
    .error-container > span.zero:before {
      content: '';
      display: block;
      position: absolute;
      transform: rotate(45deg);
      width: 90px;
      height: 90px;
      background-color: transparent;
      left: 0px;
      bottom: 0px;
      background: linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%), linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%);
    }
    .error-container > span.zero:after {
      content: '';
      display: block;
      position: absolute;
      border-radius: 999px;
      width: 70px;
      height: 70px;
      left: 43px;
      bottom: 43px;
      background: #FDFAF5;
      box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
    }
    .screen-reader-text {
      position: absolute;
      top: -9999em;
      left: -9999em;
    }
    @keyframes bgshadow {
      0% {
        box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
      }
      45% {
        box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
      }
      55% {
        box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
      }
      100% {
        box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
      }
    }
    body {
      background-color: #FDFAF5;
      margin-bottom: 50px;
    }
    h1 {
      text-align: center;
      margin: 30px 15px;
    }
    .zoom-area {
      max-width: 490px;
      margin: 30px auto 30px;
      font-size: 19px;
      text-align: center;
    }
    .link-container {
      text-align: center;
    }
    a.more-link {
      text-transform: uppercase;
      font-size: 13px;
      background-color: #de7e85;
      padding: 10px 15px;
      color: #fff;
      margin-top: 50px;
      text-decoration: none;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <p class="zoom-area"></p>
  <section class="error-container">
  <span class="four"><span class="screen-reader-text">4</span></span>
  <span class="zero"><span class="screen-reader-text">0</span></span>
  <span class="four"><span class="screen-reader-text">4</span></span>
  </section>
  <h1>PAGE NOT FOUND</h1>
  <div class="link-container">
    <a target="_blank" href="https://omc-solutions.fr/" class="more-link">RETURN TO HOME</a>
  </div>
</body>
</html>

  `);
});

// Middleware global pour gérer toutes les autres erreurs
app.use((err, req, res, next) => {
  console.error("Erreur du serveur:", err);
  res.status(500).send("Erreur interne du serveur.");
});

app.listen(port, () => {
  console.log(`Serveur tourne sur http://localhost:${port}`);
});
