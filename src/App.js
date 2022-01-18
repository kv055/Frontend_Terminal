import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

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
  const [OHLCData, setOHLCData] = useState({componentReadyToRender: false, nextNetworkRequestReady: false})
  const [fetchOHLCconfig, setfetchOHLCconfig] = useState({Loading: true})
 
  // Then wait till we get the necesary Data from the HeaderDataFetcher Component to start 
  // fetching OHLC Data (recieveOHLCconfig is a callback function that gets the data out of the Component)
  let recieveOHLCconfig = (childData) =>{
    setfetchOHLCconfig({
      ohlcConfig: childData.ohlcConfig,
      Loading : false
    })
  }
  
  // Performing the POST request to fetch OHLC data and writing it into the PlotData state
  const fetchOHLC = async () =>{
    let ohlcFetched = await POST('http://127.0.0.1:5001/OHLC', fetchOHLCconfig)
    let indicatorsFetched = await GET('http://127.0.0.1:5001/Indicators')
    let SimulationFetched = await GET('http://127.0.0.1:5001/Simulation')
    setOHLCData({
       OHLC: OHLC_Data_Formater(ohlcFetched.OHLC),
       Layout: OHLC_Layout(ohlcFetched.OHLC, ohlcFetched.config),
       config: ohlcFetched.config,
       datasetsToBeRenderedOnPlot: indicatorsFetched.Indicators,
       Simulation: SimulationFetched.Simulation,
       componentReadyToRender: true, 
       nextNetworkRequestReady: true
     })
     setfetchOHLCconfig({Loading : true})
     console.log(OHLCData);
  }

  if(fetchOHLCconfig.Loading === false){
    console.log(fetchOHLCconfig);
    fetchOHLC()
  }
  

  // // Performing the GET request to fetch Indicators data and writing it into the PlotData state
  // const fetchIndicator = async () =>{
  //   let indicatorsFetched = await GET('http://127.0.0.1:5001/Indicators')
  //   setPlotData({
  //      Indicators: indicatorsFetched.Indicators,
  //      Loading : false
  //    })
  //    setOHLCData({nextNetworkRequestReady: false})
  //    console.log(PlotData);
  // }

  // if(OHLCData.nextNetworkRequestReady === true){
  //   fetchIndicator()
  // }


  // let GetPlotData = async () => {
  //   let IndicatorFetched = await GET('http://127.0.0.1:5001/Indicators')
  //   let SimulationFetched = await GET('http://127.0.0.1:5001/Simulation')
  //   setPlotData({
  //     Indicators: IndicatorFetched.Indicators,
  //     Simulation: SimulationFetched.Simulation,
      
  //   })
  // }

  // if(OHLCData.Loading === false){
  //   GetPlotData()
  //   setOHLCData({Loading : true})
  // }

  let OHLCChart = OHLCData.componentReadyToRender === false ? 
    <p>Loading Chart</p>  : 
    <Plot 
      dataSet={[
        OHLCData.OHLC,
        Multiple_DataSets(OHLCData.datasetsToBeRenderedOnPlot)[0],
        Multiple_DataSets(OHLCData.datasetsToBeRenderedOnPlot)[1],
        Multiple_DataSets(OHLCData.datasetsToBeRenderedOnPlot)[2],
        Simulator_Data_Formater(OHLCData.Simulation)
      ]}
      layoutSet={OHLCData.Layout}
    />
  
  // Initialise Dashboard
  let TradesList = OHLCData.componentReadyToRender === false ?
    <p>Loading Simulation</p> :
      <TradesHistory 
        dataSet={OHLCData.Simulation}
      />

      
  return (
    <div className="App">
      {<AbelianHeader />}
      {<HeaderDataFetcher childData={recieveOHLCconfig} />}
      {OHLCChart}
      {/* <HeaderStrategyIndicator />
      {LineChart}
      <HeaderSimulationFetcher />
      {SimulationChart} */}
      {TradesList}
    </div>
  );
}

export default App;


















// {
//   "Simulation": {
//     "AssetAmount": [
//       0.01, 
//       0.00978944, 
//       0.00954301, 
//       0.00747144, 
//       0.00731283, 
//       0.0071275, 
//       0.00558028, 
//       0.00546123, 
//       0.00532258, 
//       0.00416717, 
//       0.00408088, 
//       0.00397849, 
//       0.00311485, 
//       0.00304813, 
//       0.00297235, 
//       0.00232712, 
//       0.00227941, 
//       0.0022235, 
//       0.00174083, 
//       0.00170455, 
//       0.00166283, 
//       0.00130186, 
//       0.0012734, 
//       0.0012404, 
//       0.00097026, 
//       0.00094952, 
//       0.00092408, 
//       0.00072394, 
//       0.00070879, 
//       0.00069018, 
//       0.0005407, 
//       0.00052825, 
//       0.0005138, 
//       0.00040252, 
//       0.00039452, 
//       0.00038344, 
//       0.00030039, 
//       0.00029422, 
//       0.00028758, 
//       0.00022529, 
//       0.00022066, 
//       0.00021472, 
//       0.00016822, 
//       0.00016382, 
//       0.00016104, 
//       0.00012616, 
//       0.0001237, 
//       0.00011887, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31
//     ], 
//     "AssetPrice": [
//       1, 
//       1, 
//       1
//     ], 
//     "Cash": [
//       0, 
//       29.29, 
//       24.85, 
//       21.88, 
//       18.56, 
//       16.34, 
//       13.86, 
//       12.21, 
//       10.36, 
//       9.12, 
//       7.74, 
//       6.82, 
//       5.79, 
//       5.1, 
//       4.33, 
//       3.81, 
//       3.23, 
//       2.84, 
//       2.41, 
//       2.12, 
//       1.8, 
//       1.58, 
//       1.34, 
//       1.18, 
//       1.0, 
//       0.88, 
//       0.75, 
//       0.66, 
//       0.56, 
//       0.49, 
//       0.42, 
//       0.37, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31, 
//       0.31
//     ], 
//     "Time": [
//       "2021-12-23T08:00:00", 
//       "2021-12-31T08:00:00", 
//       "2022-01-15T08:00:00"
//     ], 
//     "Trades": [
//       {
//         "AssetPrice": 1, 
//         "Direction": "Long", 
//         "From": 0.31, 
//         "Open": "2021-12-23T08:00:00", 
//         "To": 0.31
//       }, 
//       {
//         "AssetPrice": 1, 
//         "Direction": "Short", 
//         "From": 0.31, 
//         "Open": "2021-12-31T08:00:00", 
//         "PnL": 0.0, 
//         "To": 0.31
//       }, 
//       {
//         "AssetPrice": 1, 
//         "Direction": "Long", 
//         "From": 0.31, 
//         "Open": "2022-01-15T08:00:00", 
//         "PnL": 0.0, 
//         "To": 0.31
//       }
//     ]
//   }
// }