const { Router } = require("express");
const router = Router();
const rutaRepaso = require("./repaso");

router.use("/repaso", rutaRepaso);

module.exports = router;
