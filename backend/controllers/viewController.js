const coffee = "coffee"
const coffee_id = 1
const negativeEmotion = "negativeemotion"
const negativeEmotion_id = 2
const entertainment = "entertainment"
const entertainment_id = 3
const climate = "climate"
const climate_id = 4
const health = "health"
const health_id = 5
const unemployment = "unemployment"
const unemployment_id = 6

// render map according to the caseID of the scenario
const renderMap = async (req, res) => {
    try {
        if(req.params.sc == coffee){
            res.render('map.hbs',{id:coffee_id})
        }
        else if (req.params.sc == negativeEmotion){
            res.render('map.hbs',{id:negativeEmotion_id})
        }
        else if (req.params.sc == entertainment){
            res.render('map.hbs',{id:entertainment_id})
        }
        else if (req.params.sc == climate){
            res.render('map.hbs',{id:climate_id})
        }
        else if (req.params.sc == health){
            res.render('map.hbs',{id:health_id})
        }
        else if (req.params.sc == unemployment){
            res.render('map.hbs',{id:unemployment_id})
        }
    } catch (err) {
        return res.render('404notFound.hbs')
    }
}

// render background to introduce our team and project
const renderBackground = async (req, res) => {
    try {
        res.render('background.hbs')
    } catch (err) {
        return res.render('404notFound.hbs')
    }
}

// render analysisi according to the caseID of the scenario
const renderAnlysis = async (req, res) => {
    try {
        if(req.params.sc == coffee){
            res.render('analysis.hbs',{id:coffee_id})
        }
        else if (req.params.sc == negativeEmotion){
            res.render('analysis.hbs',{id:negativeEmotion_id})
        }
        else if (req.params.sc == entertainment){
            res.render('analysis.hbs',{id:entertainment_id})
        }
    } catch (err) {
        return res.render('404notFound.hbs')
    }
}
// render Mastodon
const renderMastodon = async (req, res) => {
    try {
        // res.setheader("Access-Control-Allow-Origin", "*");
        res.render('mastodon.hbs')
    } catch (err) {
        return res.render('404notFound.hbs')
    }
}
module.exports={
    renderMap,
    renderBackground,
    renderAnlysis,
    renderMastodon
}