
const coffee = "coffee"
const coffee_id = 1
const negativeEmotion = "negativeemotion"
const negativeEmotion_id = 2
const entertainment = "entertainment"
const entertainment_id = 3

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