const notFound = (req, res) => {
    let resource = req.originalUrl || req.url;
    let method= req.method;
    res.status(404).send(
        '<h1>404 Not Found</h1>' +  
        method + ": " + resource
    );
}

module.exports = {
    notFound
}
