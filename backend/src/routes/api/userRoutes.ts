const express = require('express');
import { register, login } from "../../controller/authenticationController";

const router = express.Router();

router.route('/auth/register')
    .post(register);

router.route('/auth/login')
    .post(login);

module.exports = router;