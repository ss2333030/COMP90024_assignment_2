const coffee_total_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/coffee/_view/postTot?stale=ok'
const coffee_lga_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/coffee/_view/coffee?group=true&stale=ok'
const coffee_mast_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/coffee/_view/coffee?stale=ok'
const coffee_state_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/coffee/_view/coffee_state?group=true&stale=ok'
const work_total_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/nega/_view/work?stale=ok'
const nega_total_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/nega/_view/nega?stale=ok'
const nega_lga_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/nega/_view/nega?group=true&stale=ok'
const nega_state_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/nega/_view/nega_state?group=true&stale=ok'
const enter_total_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/enter/_view/enter?stale=ok'
const enter_lga_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/enter/_view/enter?group=true&stale=ok'
const enter_state_request = 'http://admin:password@172.26.135.30:5984/twitter/_design/enter/_view/enter_state?group=true&stale=ok'
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


const axios = require("axios")

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
    renderMastWork
}