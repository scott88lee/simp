const notFound = (req, res) => {
    let resource = req.originalUrl || req.url;
    res.status(404).send(
        '<h1>404 Not Found</h1>' +  resource
    );
}

module.exports = {
    notFound
}