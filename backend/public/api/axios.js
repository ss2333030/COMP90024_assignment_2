import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

// Function to query the twitter data for map in coffee scenario
async function queryCoffeeForMap() {
  try {
      const coffeeTwitter = await axios.get('/coffee/twitter')
      const coffeeLGA = await axios.get('/coffee/lga')
      await calPercent(coffeeTwitter, coffeeLGA)
      return calDiff(coffeeLGA.data.rows, await queryTotBForMap())
      } catch (error) {
        console.error(error);
      }
}

// Function to query the twitter data for analysis bar chart in coffee scenario
async function queryCoffeeForAnalysis() {
  try {
      const coffeeTwitter = await axios.get('/coffee/twitter')
      const coffeeState = await axios.get('/coffee/state')
      await calPercent(coffeeTwitter, coffeeState)
      return coffeeState.data.rows
      } catch (error) {
        console.error(error);
      }
}

// Function to query the twitter data for mastodon comparison in coffee scenario
async function queryCoffeeForMast() {
  try {
    const total = await axios.get('/coffee/twitter')
    const coffeeMast = await axios.get('/coffee/mast')
    console.log("total:", total)
    return coffeeMast.data.rows[0].value / total.data.rows[0].value 
    } catch (error) {
      console.error(error);
    }
}

// Function to query the twitter data for mastodon comparison in negative scenario
async function queryNegaForMast() {
  try {
    const total = await queryWorkForMast()
    const NegaMast = await axios.get('/negative/twitter')
    return NegaMast.data.rows[0].value / total
    } catch (error) {
      console.error(error);
    }
}

// Function to query the work twitter data for mastodon comparison in negative scenario
async function queryWorkForMast() {
  try {
      const work  = await axios.get('/work/twitter')
      return work.data.rows[0].value
  } catch (error) {
    console.error(error);
  }
}

// Function to query the twitter data for map in negative scenario
async function queryNegativeForMap() {
  try {
      const negativeLGA = await axios.get('/negative/lga')
      const negativeTotal = await axios.get('/negative/twitter')
      await calPercent(negativeTotal, negativeLGA)
      return calDiff(negativeLGA.data.rows, await queryTotBForMap())
  } catch (error) {
    console.error(error);
  }
}

// Function to query the twitter data for analysis bar chart in negative scenario
async function queryNegativeForAnalysis() {
  try {
      const negativeState = await axios.get('/negative/state')
      const negativeTotal = await axios.get('/negative/twitter')
      await calPercent(negativeTotal, negativeState)
      return negativeState.data.rows
  } catch (error) {
    console.error(error);
  }
}

// Function to query the twitter data for map in entertainment scenario
async function queryEntertainmentForMap() {
  try {
      const entertainmentLGA = await axios.get('/enter/lga')
      const entertainmentTotal = await axios.get('/enter/twitter')
      await calPercent(entertainmentTotal, entertainmentLGA)
      return calDiff(entertainmentLGA.data.rows, await queryTotBForMap())
  } catch (error) {
    console.error(error);

  }
}

// Function to query the twitter data for analysis bar chart in entertainment scenario
async function queryEntertainmentForAnalysis() {
  try {
      const entertainmentState = await axios.get('/enter/state')
      const entertainmentTotal = await axios.get('/enter/twitter')
      await calPercent(entertainmentTotal, entertainmentState)
      return entertainmentState.data.rows
  } catch (error) {
    console.error(error);

  }
}

//Function returning the percentage of the number of business in each area to the total number of business in all areas
async function queryTotBForMap() {
  try {
    const totalBLGA = await axios.get('/sudo/total')
    const totalB = await axios.get('/sudo/sum')
    await calPercent(totalB, totalBLGA)
    return totalBLGA.data.rows
  } catch (error) {
    console.error(error);
  }
}

//Function returning the percentage of the number of business in each state
async function queryTotBForAnalysis() {
  try {
    const totalBState = await axios.get('/sudo/total/state')
    const totalB = await axios.get('/sudo/sum')
    await calPercent(totalB, totalBState)
    return totalBState.data.rows
  } catch (error) {
    console.error(error);
  }
}

//Function returning the percentage of the number of empl20plus business in each LGA
async function queryBigBForInfo() {
  try {
    const bigBLGA = await axios.get('/sudo/big')
    const convertedList = bigBLGA.data.rows.map(obj => ({[obj.key]: obj.value}));
    return convertedList
  } catch (error) {
    console.error(error);
  }
}

//Function returning the percentage of the number of empl20plus business in each state
async function queryBigBForAnalysis() {
  try {
    const bigBState = await axios.get('/sudo/big/state')
    const convertedList = bigBState.data.rows.map(obj => ({[obj.key]: obj.value}));
    return convertedList
  } catch (error) {
    console.error(error);
  }
}

//Function returning the percentage of the number of empl119 business in each LGA
async function querySmallBForInfo() {
  try {
    const smallBLGA = await axios.get('/sudo/small')
    const convertedList = smallBLGA.data.rows.map(obj => ({[obj.key]: obj.value}));
    return convertedList
  } catch (error) {
    console.error(error);
  }
}


//Function returning the percentage of the number of empl119plus business in each state
async function querySmallBForAnalysis() {
  try {
    const smallBState= await axios.get('/sudo/small/state')
    const convertedList = smallBState.data.rows.map(obj => ({[obj.key]: obj.value}));
    return convertedList
  } catch (error) {
    console.error(error);
  }
}

//Function returning the percentage of the business SD in each LGA
async function queryBSD() {
  try {
    const busiSD = await axios.get('/sudo/bSD')
    const convertedList = busiSD.data.rows.map(obj => ({[obj.key]: obj.value}));
    return convertedList
  } catch (error) {
    console.error(error);
  }
}

//Function returning the percentage of the business SD in each state
async function queryBSDForAnalysis() {
  try {
    const busiSDState = await axios.get('/sudo/bSD/state')
    const convertedList = busiSDState.data.rows.map(obj => ({[obj.key]: obj.value}));
    return convertedList
  } catch (error) {
    console.error(error);
  }
}

// Query for Mastodon data about coffee
async function queryMastodonCoffee() {
  try {
    const mastCoffee = await axios.get('/mast/coffee')
    let total = await queryMastodonTotal()
    let coffee = mastCoffee.data.rows[0].value
    total = total.data.rows[0].value
    return coffee / total
  } catch (error) {
    console.error(error);
  }
}

// Query for Mastodon data of number of total posts
async function queryMastodonTotal() {
  try {
    const mastTotal = await axios.get('/mast/total')
    return mastTotal
  } catch (error) {
    console.error(error);

  }
}

// Query for Mastodon data about negative work attitude
async function queryMastodonNega() {
  try {
    const mastNega = await axios.get('/mast/nega')
    return mastNega.data.rows[0].value / await queryMastodonWork()

  } catch (error) {
    console.error(error);
  }
}

// Query for Mastodon data about work 
async function queryMastodonWork() {
  try {
    const mastWork = await axios.get('/mast/work')
    return mastWork.data.rows[0].value
  } catch (error) {
    console.error(error);

  }
}

// Function calculates the percentage for twitter data
function calPercent(total, lga){
  let total_num = total.data.rows[0].value
  let lgas = lga.data.rows
  for (let i=0; i<lgas.length; i++){
    let value = lgas[i].value
    let percent = (value / total_num) * 100 
    lgas[i].value = percent
  }
  return lgas
}

// Function to calculate the difference of percentages between the post percentage for each topics 
// and the percentage showing the distribution of business
function calDiff(scene, busi){
  let result = {}
  for (let i=0; i<scene.length; i++){
    for (let j=0; j<busi.length; j++){
      if (scene[i].key == busi[j].key){
        console.log("minus")
        result[scene[i].key] = Math.abs(scene[i].value - busi[i].value)
      }
    }
  }
  let scene_keys = scene.map(obj => obj.key)
  let busi_keys = busi.map(obj => obj.key)

  let scene_unique = scene.filter(obj => !busi_keys.includes(obj.key))
  let busi_unique = busi.filter(obj => !scene_keys.includes(obj.key))

  for (let k in scene_unique){
    result[scene_unique[k].key] = Math.abs(scene_unique[k].value)
  }

  for (let l in busi_unique){
    result[busi_unique[l].key] = Math.abs(busi_unique[l].value)
  }
  return result
}




export {
  queryCoffeeForMap,
  queryNegativeForMap,
  queryEntertainmentForMap,
  queryBigBForInfo,
  querySmallBForInfo,
  queryTotBForMap,
  queryBSD,
  queryMastodonCoffee,
  queryMastodonNega,
  queryEntertainmentForAnalysis,
  queryNegativeForAnalysis,
  queryCoffeeForAnalysis,
  queryBigBForAnalysis,
  querySmallBForAnalysis,
  queryBSDForAnalysis,
  queryTotBForAnalysis,
  queryCoffeeForMast,
  queryNegaForMast
}

