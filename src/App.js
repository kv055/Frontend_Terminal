import {useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// Data Fetch module
import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'
//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'
// import Simulator_Data_Formater from './formater_Modules/Simulator_Data_Formater'
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
import HeaderIndicator from './visualizer/HeaderIndicatorFetcher'
import HeaderSimulation from './visualizer/HeaderSimulationFetcher'
import TradesHistory from './visualizer/TradesHistory'

function App() {
  // Initialize State Variable
  const [IndicatorData, setIndicatorData] = useState({Loading: true})
  const [SimulationData, setSimulationData] = useState({Loading: true, TradesListReadyToRender: false})
  const [OHLCData, setOHLCData] = useState({OHLCChartReadyToRender: false})
  const [fetchOHLCconfig, setfetchOHLCconfig] = useState({Loading: true})
 
  // Then wait till we get the necesary Data from the HeaderDataFetcher Component to start 
  // fetching OHLC Data (recieveOHLCconfig is a callback function that gets the data out of the Component)
  let recieveOHLCconfig = (childData) =>{
    console.log(childData);
    setfetchOHLCconfig({
      ohlcConfig: { exchange: childData.ohlcConfig.exchange.mic,
                    assetPair: childData.ohlcConfig.assetPair.symbol,
                    candleSize: childData.ohlcConfig.candleSize 
      },
      Loading : false
    })
  }
  
  // Performing the POST request to fetch OHLC data and writing it into the OHLCData state
  const fetchOHLC = async () =>{
    console.log(fetchOHLCconfig.ohlcConfig);
    let ohlcFetched = await POST('http://127.0.0.1:5001/OHLC', fetchOHLCconfig)
    setOHLCData({
       OHLC: OHLC_Data_Formater(ohlcFetched.OHLC),
       Layout: OHLC_Layout(ohlcFetched.OHLC, ohlcFetched.config),
       config: ohlcFetched.config,
       OHLCChartReadyToRender: true, 
       readyToFetchIndicators: true,
       readyToFetchSimulation: true
     })
     setfetchOHLCconfig({Loading : true})
  }

  if(fetchOHLCconfig.Loading === false){
    fetchOHLC()
  }
  

  // Performing the GET request to fetch Indicators data and writing it into the IndicatorData state
  const fetchIndicator = async () =>{
    let indicatorsFetched = await GET('http://127.0.0.1:5001/Indicators')
    setIndicatorData({
       Indicator1: Multiple_DataSets(indicatorsFetched.Indicators)[0],
       Indicator2: Multiple_DataSets(indicatorsFetched.Indicators)[1],
       Indicator3: Multiple_DataSets(indicatorsFetched.Indicators)[2],
       Loading : false
     })
     setOHLCData({readyToFetchIndicators: false})
  }

  if(OHLCData.readyToFetchIndicators === true){
    fetchIndicator()
  }

  // Performing the GET request to fetch Simulation data and writing it into the IndicatorData state
  let fetchSimulation = async () => {

    let SimulationFetched = await GET('http://127.0.0.1:5001/Simulation')
    setSimulationData({
      Simulation: SimulationFetched.Simulation, 
      TradesListReadyToRender: true
    })
    console.log(SimulationData);
    setOHLCData({readyToFetchSimulation: false})
  }

  // if(OHLCData.readyToFetchSimulation === true){
  //   setTimeout(fetchSimulation(), 5000)
    
  // }

  let OHLCChart = OHLCData.OHLCChartReadyToRender === false ? 
    <p>Loading Chart</p>  : 
    <Plot 
      dataSet={[
        OHLCData.OHLC,
        // IndicatorData.Indicator1,
        IndicatorData.Indicator2,
        IndicatorData.Indicator3,
        // SimulationData.Simulation
      ]}
      layoutSet={OHLCData.Layout}
    />
  
  // // Initialise Dashboard
  // let TradesList = SimulationData.TradesListReadyToRender === false ?
  //   <p>Loading Simulation</p> :
  //     <TradesHistory 
  //       dataSet={SimulationData.Simulation}
  //     />

      
  return (
    <div className="App">
      <Row>
        <Col>
          {<AbelianHeader />}  
        </Col>
        <Col>
          {<HeaderDataFetcher childData={recieveOHLCconfig} />}
        </Col>
      </Row>
      <Row>
        {OHLCChart}
      </Row>
      <Row>
        <Col>
          <HeaderIndicator />
        </Col>
        <Col>
          <HeaderSimulation />
        </Col>
      </Row>
      {/* {TradesList} */}
    </div>
  );
}

export default App;