import {useState, useEffect} from 'react';
// Data Fetch module
import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'
//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'
import Simulator_Data_Formater from './formater_Modules/Simulator_Data_Formater'
// import Simulator_Layout from './formater_Modules/Simulator_Layout_Formater'
// import Strategy_Indicator_Layout from './formater_Modules/Strategy_Indicator_Layout'
// import Strategy_Data_Formater from './formater_Modules/Markers_DataSets_Formater'
// import Lines_Data_Formater from './formater_Modules/Line_DataSets_Formater'

import Multiple_DataSets from './formater_Modules/Multiple_Data_Sets_Formater'

//Plot Generator Modules
import Plot from './generator_Modules/PlotGenerator'
// import MultiplePlotsGenerator from './generator_Modules/MultiplePlotsGenerator'
//UI Dashboard Modules
import AbelianHeader from './visualizer/Abelian_Header'
import HeaderDataFetcher from './visualizer/HeaderDataFetcher'
// import HeaderStrategyIndicator from './visualizer/HeaderStrategyIndicatorFetcher'
// import HeaderSimulationFetcher from './visualizer/HeaderSimulationFetcher'
import TradesHistory from './visualizer/TradesHistory'

function App() {
  // Initialize State Variable
  const [PlotData, setPlotData] = useState({Loading: true})
  const [fetchOHLCconfig, setfetchOHLCconfig] = useState({Loading: true})
 
  // Then wait till we get the necesary Data from the HeaderDataFetcher Component to start 
  // fetching OHLC Data (recieveOHLCconfig is a callback function that gets the data out of the Component)
  let recieveOHLCconfig = (childData) =>{
    console.log(childData);
    setfetchOHLCconfig({
      ohlcConfig: childData.ohlcConfig,
      Loading : false
    })
  }
  
  // Performing the POST request to fetch OHLC data and writing it into the PlotData state
  const fetchOHLC = async () =>{
    let ohlcFetched = await POST('http://127.0.0.1:5001/OHLC', fetchOHLCconfig)
     setPlotData({
       OHLC: ohlcFetched.OHLC,
       config: ohlcFetched.config,
       Loading : false
     })
     setfetchOHLCconfig({Loading : true})
     console.log(PlotData);
  }

  if(fetchOHLCconfig.Loading === false){
    console.log(fetchOHLCconfig);
    fetchOHLC()
  }
  
  
  
  // let GetPlotData = async () => {
  //     // let IndicatorFetched = await DataFetch('http://127.0.0.1:5001/Indicators')

     
  //   setPlotData({
  //     // Indicators: IndicatorFetched.Indicators,
  //     // OHLC: OHLCFetched.OHLC,
  //     // Simulation: SimulationFetched.Simulation,
      
  //   })
  // }
  // // Execute Fetch function and set State 
  // useEffect(() => {
  //   GetPlotData()
  // },[])




  // Initialise Plot Variables
  // let LineChart = PlotData.Loading === true ? 
  //   <p>Loading</p>  : 
  //   <Plot 
  //     dataSet={[
  //       // Strategy_Data_Formater(PlotData.Indicators[0]),
  //       Lines_Data_Formater(PlotData.Indicators[0]),
  //       // Lines_Data_Formater(PlotData.Indicators[2])
  //     ]}
  //     layoutSet={Strategy_Indicator_Layout()}
  //   />

  let OHLCChart = PlotData.Loading === true ? 
    <p>Loading</p>  : 
    <Plot 
      dataSet={[
        OHLC_Data_Formater(PlotData.OHLC),
        // Multiple_DataSets(PlotData.Indicators)[0],
        // Multiple_DataSets(PlotData.Indicators)[1],
        // Multiple_DataSets(PlotData.Indicators)[2],
        // Simulator_Data_Formater(PlotData.Simulation)
      ]}
      layoutSet={OHLC_Layout(PlotData)}
    />
  
  // // Initialise Dashboard
  // let TradesList = PlotData.Loading === true ?
  //   <p>Loading</p> :
  //     <TradesHistory 
  //       dataSet={PlotData.Simulation}
  //     />
    // let SimulationChart = PlotData.Loading === true ?
  //   <p>Loading</p>  : 
  //   <Plot 
  //     dataSet={[Simulator_Data_Formater(PlotData.Simulation)]}
  //     layoutSet={Simulator_Layout()}
  //   />
      
  return (
    <div className="App">
      {<AbelianHeader />}
      {<HeaderDataFetcher childData={recieveOHLCconfig} />}
      {OHLCChart}
      {/* <HeaderStrategyIndicator />
      {LineChart}
      <HeaderSimulationFetcher />
      {SimulationChart} */}
      {/* {TradesList} */}
    </div>
  );
}

export default App;