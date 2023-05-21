import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
// const axios = require("axios")

async function queryCoffeeForMap() {
  try {
        const coffeeTwitter = await axios.get('http://localhost:8080/coffee/twitter')
        const coffeeLGA = await axios.get('http://localhost:8080/coffee/lga')
        console.log(coffeeLGA)
        return calPercent(coffeeTwitter, coffeeLGA)
      } catch (error) {
        console.error(error);

      }
}
async function queryNegativeForMap() {
  try {
    const negativeLGA = await axios.get('http://localhost:8080/negative/lga')
    const negativeTotal = await axios.get('http://localhost:8080/negative/twitter')
    console.log("totalnega:", negativeTotal)
    console.log("result:",negativeLGA)
    // console.log("result:",calPercent(negativeTotal, negativeLGA))
    return calPercent(negativeTotal, negativeLGA)
  } catch (error) {
    console.error(error);
  }
}
async function queryEntertainmentForMap() {
  try {
    const entertainmentLGA = await axios.get('http://localhost:8080/enter/lga')
    const entertainementTotal = await axios.get('http://localhost:8080/enter/twitter')
    return calPercent(entertainementTotal, entertainmentLGA)
  } catch (error) {
    console.error(error);

  }
}

async function queryTotBForMap() {
  try {
    const totalBLGA = await axios.get('http://localhost:8080/sudo/total')
    const totalB = await axios.get('http://localhost:8080/sudo/sum')
    return calPercent(totalB, totalBLGA)
  } catch (error) {
    console.error(error);

  }
}

async function queryBigBForInfo() {
  try {
    const bigBLGA = await axios.get('http://localhost:8080/sudo/big')
    const busiLGA = await axios.get('http://localhost:8080/sudo/total')
    return bigBLGA.data.rows
  } catch (error) {
    console.error(error);
  }
}

async function querySmallBForInfo() {
  try {
    const smallBLGA = await axios.get('http://localhost:8080/sudo/small')
    const busiLGA = await axios.get('http://localhost:8080/sudo/total')
    return smallBLGA.data.rows
  } catch (error) {
    console.error(error);

  }
}

// Function calculates the percentage for twitter data
async function calPercent(total, lga){
  let total_num = total.data.rows[0].value
  let lgas = lga.data.rows
  for (let i=0; i<lgas.length; i++){
    let value = lgas[i].value
    let percent = await (value / total_num) * 100 
    lgas[i].value = percent
  }
  return lgas
}

export {
  queryCoffeeForMap,
  queryNegativeForMap,
  queryEntertainmentForMap,
  queryBigBForInfo,
  querySmallBForInfo,
  queryTotBForMap
}
// module.exports = {
//   queryCouchDBView
// }
