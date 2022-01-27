import {useState} from 'react';
import {Alert, Col, Row ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// Data Fetch module
import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'
//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'


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
  const [PlotDataTraces, setPlotDataTraces] = useState([])
  const [PlotLayout, setPlotLayout] = useState([])
 
  // Then wait till we get the necesary Data from the HeaderDataFetcher Component to start 
  // fetching OHLC Data (CallbackOHLC is a callback function that gets the data out of the Component)
  let CallbackOHLC = async (childData) =>{
    console.log(childData);
    let ohlcFetched = await POST('http://127.0.0.1:5001/OHLC', {
      ohlcConfig: { exchange: childData.ohlcConfig.exchange.mic,
                    assetPair: childData.ohlcConfig.assetPair.symbol,
                    candleSize: childData.ohlcConfig.candleSize 
      }
    })
    setOHLCData({
       OHLC: OHLC_Data_Formater(ohlcFetched.OHLC),
       Layout: OHLC_Layout(ohlcFetched.OHLC, ohlcFetched.config),
       config: ohlcFetched.config,
       OHLCChartReadyToRender: true, 
       readyToFetchIndicators: true,
       readyToFetchSimulation: true
     })
     setPlotLayout({Layout: OHLC_Layout(ohlcFetched.OHLC, ohlcFetched.config)})
     setPlotDataTraces([OHLC_Data_Formater(ohlcFetched.OHLC)])
     console.log(PlotLayout);
  }
  


  // Performing the GET request to fetch Simulation data and writing it into the IndicatorData state
  // let fetchSimulation = async () => {

  //   let SimulationFetched = await GET('http://127.0.0.1:5001/Simulation')
  //   setSimulationData({
  //     Simulation: SimulationFetched.Simulation, 
  //     TradesListReadyToRender: true
  //   })
  //   console.log('105',SimulationData);
  //   setOHLCData({readyToFetchSimulation: false})
  // }

  // if(OHLCData.readyToFetchSimulation === true){
  //   fetchSimulation()
    
  // }

  const recieveIndicatorConfig = async (childData) => {
    let indicatorData = await POST('http://localhost:5001/RenderIndicator', {config: childData})
    console.log(indicatorData);
    let TestRendeering = Multiple_DataSets([indicatorData.Test],indicatorData.config)

    setPlotDataTraces([...PlotDataTraces, TestRendeering[0]])

  }

  let OHLCChart = OHLCData.OHLCChartReadyToRender === false ? 
  <Alert variant='light'> <h4 style={{ }}>Loading Graph</h4> <Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Alert>  : 
    <Plot 
      dataSet={ PlotDataTraces }
      layoutSet={ PlotLayout.Layout }
    />
  
  // Initialise Dashboard
  let TradesList = SimulationData.TradesListReadyToRender === false ?
    <Alert variant='light'> <h4 style={{ }}>Loading Simulation</h4><Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Alert> :
      <TradesHistory 
        dataSet={SimulationData.Simulation}
      />

      
  return (
    <div className="App">
      <Row>
        <Col>
          {<AbelianHeader />}  
        </Col>
        <Col>
          {<HeaderDataFetcher childData={CallbackOHLC} />}
        </Col>
      </Row>
      <Row>
        {OHLCChart}
      </Row>
      <Row>
        <Col>
          <HeaderIndicator childData={recieveIndicatorConfig}/>
        </Col>
        <Col>
          <HeaderSimulation />
        </Col>
      </Row>
      {TradesList}
    </div>
  );
}

export default App;