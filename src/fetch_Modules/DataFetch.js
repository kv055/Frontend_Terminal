async function IndicatorsFetch(URL){
    let rawIndicators = await fetch(URL)
    let jsonIndicators = await rawIndicators.json()
    return jsonIndicators
  }
export default IndicatorsFetch