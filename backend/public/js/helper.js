const coffeeCase = 1
const negativeCase = 2
const entertainmentCase = 3



const helpers = {
  // show contetn when caseid is received
  showContentById: function (id, options) {
    if (id === coffeeCase) {
      return 'Does the percentage of tweets mentioning coffee in an area to the total number of tweets mentioned coffee correlate with the percentage of business companies to the number of business companies in Australia?';
    } else if (id === negativeCase) {
      return 'Do the percentage of tweets expressing negative emotions about work and the Business Sophistication Indicator Standard Deviation in an area correlate with each other?';
    } else if (id === entertainmentCase) {
      return 'Do the percentage of tweets expressing positive emotions in an area at night correlate with the percentage of business companies to the number of business companies in Australia?';
    }
  }
}
module.exports.helpers = helpers
