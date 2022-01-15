async function FetchGET(URL){
    let answerRaw = await fetch(URL)
    let answerJSON = await answerRaw.json()
    return answerJSON
  }
export default FetchGET