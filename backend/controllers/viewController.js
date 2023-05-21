const renderMap = async (req, res) => {
    try {
        res.render('map.hbs')
    } catch (err) {
        return res.render('404notFound.hbs')
    }
}
const renderBackground = async (req, res) => {
    try {
        res.render('background.hbs')
    } catch (err) {
        return res.render('404notFound.hbs')
    }
}
const renderAnlysis = async (req, res) => {
    try {
        // res.setheader("Access-Control-Allow-Origin", "*");
        res.render('analysis.hbs',{num:req.params.id})
    } catch (err) {
        return res.render('404notFound.hbs')
    }
}
module.exports={
    renderMap,
    renderBackground,
    renderAnlysis,
}