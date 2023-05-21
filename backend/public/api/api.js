const coffee_total_request = 'http://admin:password@172.26.135.30:5984/twitter_data/_design/coffee/_view/postTot?stale=ok'
const coffee_lga_request = 'http://admin:password@172.26.135.30:5984/twitter_data/_design/coffee/_view/coffee?group=true&stale=ok'
const nega_total_request = 'http://admin:password@172.26.135.30:5984/twitter_data/_design/nega/_view/nega?stale=ok'
const nega_lga_request = 'http://admin:password@172.26.135.30:5984/twitter_data/_design/nega/_view/nega?group=true&stale=ok'
const enter_total_request = 'http://admin:password@172.26.135.30:5984/twitter_data/_design/enter/_view/enter?stale=ok'
const enter_lga_request = 'http://admin:password@172.26.135.30:5984/twitter_data/_design/enter/_view/enter?group=true&stale=ok'
const sudo_bigB_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/bigB?stale=ok'
const sudo_smallB_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/smallB?stale=ok'
const sudo_totB_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/totB?stale=ok'
const sudo_totSum_request = 'http://admin:password@172.26.135.30:5984/sudo/_design/busiPercent/_view/totSum?stale=ok'
const mastodon_coffee_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/coffee/_view/coffee?stale=ok'
const mastodon_total_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/coffee/_view/total?stale=ok'
const mastodon_nega_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/nega/_view/nega?stale=ok'
const mastodon_work_request = 'http://admin:password@172.26.135.30:5984/mastodon/_design/nega/_view/work?stale=ok'


const axios = require("axios")
const renderHomepage = async (req, res) => {
    try {
        res.send("Backend is connected")
    } catch (err) {
        res.send(err)
    }
}
const renderCoffeeTwitter = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(coffee_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}
const renderCoffeeLGA = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(coffee_lga_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderNegativeTwitter = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(nega_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderNegativeLGA = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(nega_lga_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderEnterTotal = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(enter_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderEnterLGA = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(enter_lga_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderSudoBigB = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_bigB_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderSudoSmallB = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_smallB_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderSudoTotalB = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_totB_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderSudoTotalSum = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(sudo_totSum_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderMastCoffee = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(mastodon_coffee_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderMastTotal = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(mastodon_total_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

const renderMastNega = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const response = await axios.get(mastodon_nega_request)
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
}

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
    renderHomepage,
    renderCoffeeTwitter,
    renderCoffeeLGA,
    renderEnterLGA,
    renderEnterTotal,
    renderNegativeLGA,
    renderNegativeTwitter,
    renderSudoTotalSum,
    renderSudoTotalB,
    renderSudoSmallB,
    renderSudoBigB,
    renderMastCoffee,
    renderMastTotal,
    renderMastNega,
    renderMastWork,
}