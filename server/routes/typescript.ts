const router = require('express').Router();

router.get('/', (req: any, res: any) => {
    res.send('Hello Mother!');
});


function doThings() {
    console.log('do things');
}
module.exports = router;