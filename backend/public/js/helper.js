const coffeeCase = 1
const negativeCase = 2
const entertainmentCase = 3
const climateCase = 4
const healthCase = 5
const unCase = 6



const helpers = {
  // show contetn when caseid is received
  showContentById: function (id, options) {
    if (id === coffeeCase) {
      return 'Do working individuals tend to enjoy drinking coffee more?';
    } else if (id === negativeCase) {
      return 'Do people experience negative emotions as a result of their work?';
    } else if (id === entertainmentCase) {
      return 'Do people sacrifice leisure activities because of their work?';
    } else if(id ===climateCase){
      return 'Do individuals who engage in online discussions about climate change actually practice corresponding environmental measures in real life?'
    } else if(id === healthCase){
      return 'Does staying up late and using the internet negatively affect the health of people who enjoy doing so?'
    } else if(id ===unCase){
      return 'Do people lose their jobs because of their addiction to the internet?'
    }

  },
  showInformationById: function (id, options) {
    if (id === coffeeCase || id === negativeCase || id ===entertainmentCase) {
      return options.fn(this)
    }
  },
  showClimateById: function (id, options) {
    if (id ===  climateCase) {
      return options.fn(this)
    }
  },
  showHealthById: function (id, options) {
    if (id ===  healthCase) {
      console.log(12)
      return options.fn(this)
    }
  },
  showUnById: function (id, options) {
    if (id ===  unCase) {
      return options.fn(this)
    }
  }
}
module.exports.helpers = helpers
