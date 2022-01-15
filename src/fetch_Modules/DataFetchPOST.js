let FetchPOST = async (URL, bodyObject) => {
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
       },
      body: JSON.stringify(bodyObject)
   };
   let answerRaw = await fetch(URL, options)
   let answerJSON = await answerRaw.json()
   return answerJSON
  };
export default FetchPOST


