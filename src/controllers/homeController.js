
const getHomepage = (req, res) => {
    res.send('Hello World! & node mon hihi')
}
const getSample = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomepage,
    getSample
}