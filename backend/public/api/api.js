const coffee_total_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/coffee/_view/postTot?stale=ok'
const coffee_lga_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/coffee/_view/coffee?group=true&stale=ok'
const coffee_mast_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/coffee/_view/coffee?stale=ok'
const coffee_state_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/coffee/_view/coffee_state?group=true&stale=ok'
const work_total_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/nega/_view/work?stale=ok'
const nega_total_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/nega/_view/nega?stale=ok'
const nega_lga_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/nega/_view/nega?group=true&stale=ok'
const nega_state_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/nega/_view/nega_state?group=true&stale=ok'
const enter_total_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/enter/_view/enter?stale=ok'
const enter_lga_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/enter/_view/enter?group=true&stale=ok'
const enter_state_request = 'http://admin:password@172.26.135.30:5984/all_twitter/_design/enter/_view/enter_state?group=true&stale=ok'
const sudo_bigB_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/bigB?group=true&stale=ok'
const sudo_smallB_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/smallB?group=true&stale=ok'
const sudo_totB_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/totB?group=true&stale=ok'
const sudo_totSum_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/totB?stale=ok'
const sudo_bSD_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/sd?group=true&stale=ok'
const sudo_bigB_state_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/bigB_state?group=true&stale=ok'
const sudo_smallB_state_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/smallB_state?group=true&stale=ok'
const sudo_totB_state_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/totB_state?group=true&stale=ok'
const sudo_bSD_state_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/sd_state?group=true&stale=ok'
const mastodon_coffee_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/coffee/_view/coffee?stale=ok'
const mastodon_total_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/coffee/_view/total?stale=ok'
const mastodon_nega_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/nega/_view/nega?stale=ok'
const mastodon_work_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/nega/_view/work?stale=ok'

const sudo_health_request = 'http://admin:password@172.26.135.30:5984/sudo_health/_design/health/_view/health_total?group=true&stale=ok'
const sudo_alchohol_request = 'http://admin:password@172.26.135.30:5984/sudo_health/_design/health/_view/alchohol?group=true&stale=ok'
const sudo_obesity_request = 'http://admin:password@172.26.135.30:5984/sudo_health/_design/health/_view/obesity?group=true&stale=ok'
const sudo_smoker_request = 'http://admin:password@172.26.135.30:5984/sudo_health/_design/health/_view/smoker?group=true&tale=ok'

const sudo_unemp_request = 'http://admin:password@172.26.135.30:5984/sudo_unemp/_design/unemp/_view/unemp?group=true&stale=ok'

const sudo_climate_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/total?group=true&stale=ok'
const sudo_transport_sum_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/sum?group=true&stale=ok'
const sudo_bicycle_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/bicyclegroup=true&stale=ok'
const sudo_bus_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/bus?group=true&stale=ok'
const sudo_scooter_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/scooter?group=true&stale=ok'
const sudo_train_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/train?group=true&stale=ok'
const sudo_tram_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/tram?group=true&stale=ok'
const sudo_walk_request = 'http://admin:password@172.26.135.30:5984/sudo_climate/_design/climate/_view/walk?group=true&stale=ok'

const axios = require("axios")

// Function sending the number for all transportation use
const renderSudoTransport = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_transport_sum_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}
// Function sending the number for all transportation use
const renderSudoClimate = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_climate_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}
// Function sending the number for all bicycle
const renderSudoBic = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_bicycle_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}
// Function sending the number for bus users
const renderSudoBus = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_bus_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number for scooter users
const renderSudoScooter = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_scooter_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number for train users
const renderSudoTrain = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_train_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}
// Function sending the number for tram users
const renderSudoTram = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_tram_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number for walking people
const renderSudoWalk = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_walk_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}



// Function sending the unemployment rate
const renderSudoUnemp = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_unemp_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of people having health problem
const renderSudoHealth = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_health_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}
// Function sending the total number of twitters from the request 
const renderSudoAlchohol = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_alchohol_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}
// Function sending the number of obesity people
const renderSudoObesity = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_obesity_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of smokers
const renderSudoSmoker= async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_smoker_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of twitters from the request 
const renderCoffeeTwitter = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(coffee_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of twitters about coffee in each LGA from the request 
const renderCoffeeLGA = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(coffee_lga_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of twitters about coffee in each state from the request 
const renderCoffeeState = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(coffee_state_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of twitters about coffee from the request 
const renderCoffeeMast = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(coffee_mast_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of twitters about negative attitude in work from the request 
const renderWorkTwitter = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(work_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of twitters about negative attitude in work from the request 
const renderNegativeTwitter = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(nega_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of twitters about negative attitude in work in each LGA from the request 
const renderNegativeLGA = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(nega_lga_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of twitters about negative attitude in work in each state from the request 
const renderNegativeState = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(nega_state_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of twitters about entertainment from the request 
const renderEnterTotal = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(enter_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of twitters about entertainment in each LGA from the request 
const renderEnterLGA = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(enter_lga_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of twitters about entertainment in each state from the request 
const renderEnterState = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(enter_state_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of empl20plus business in each LGA
const renderSudoBigB = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_bigB_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of empl20plus business in each state
const renderSudoBigBState = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_bigB_state_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of empl119 business in each LGA
const renderSudoSmallB = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_smallB_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of empl119 business in each state
const renderSudoSmallBState = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_smallB_state_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of business in each LGA
const renderSudoTotalB = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_totB_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}


// Function sending the total number of business in each state
const renderSudoTotalBState = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_totB_state_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}


// Function sending the total number of business in all areas
const renderSudoTotalSum = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_totSum_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the standard deviation for each LGA
const renderBusiSD = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_bSD_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the sum of SD in each state
const renderBusiSDState = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_bSD_state_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of post about coffee in mastodon
const renderMastCoffee = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(mastodon_coffee_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the total number of posts in mastodon
const renderMastTotal = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(mastodon_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of posts about negative work attitude in mastodon
const renderMastNega = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(mastodon_nega_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

// Function sending the number of post about work in mastodon
const renderMastWork = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(mastodon_work_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

module.exports ={
    renderCoffeeTwitter,
    renderCoffeeLGA,
    renderCoffeeState,
    renderCoffeeMast,
    renderEnterLGA,
    renderEnterState,
    renderEnterTotal,
    renderWorkTwitter,
    renderNegativeLGA,
    renderNegativeTwitter,
    renderNegativeState,
    renderSudoTotalSum,
    renderSudoTotalB,
    renderSudoSmallB,
    renderSudoBigB,
    renderBusiSD,
    renderSudoBigBState,
    renderSudoSmallBState,
    renderSudoTotalBState,
    renderBusiSDState,
    renderMastCoffee,
    renderMastTotal,
    renderMastNega,
    renderMastWork,
    renderSudoHealth,
    renderSudoObesity,
    renderSudoSmoker,
    renderSudoAlchohol,
    renderSudoUnemp,
    renderSudoClimate,
    renderSudoBic,
    renderSudoBus,
    renderSudoScooter,
    renderSudoTrain,
    renderSudoTram,
    renderSudoWalk,
    renderSudoTransport
}