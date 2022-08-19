"use strict";
const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('Hello Mother!');
});
function doThings() {
    console.log('do things');
}
module.exports = router;
