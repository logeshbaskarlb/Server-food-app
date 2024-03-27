const express = require("express");
const app = express();
const router = express.Router();
const admin = require("firebase-admin");
router.get("/", (req, res) => {
  return res.send("I am here");
});

router.get("/jwtVerfication", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({
      msg: "Token not found",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res.status(500).json({
        success: false,
        msg: "Unauthorized access token",
      });
    }
    return res.status(200).json({
      success: true, data: decodedValue
    })
  } catch (error) {
    return res.send({
      success: false,
      msg: `Error in extracting the token: ${error}`,
    });
  }
});

module.exports = router;
