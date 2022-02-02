import {useState} from 'react';
import {Alert, Col, Row ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// Data Fetch module
import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
// import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'
//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'
import Multiple_DataSets from './formater_Modules/Multiple_Data_Sets_Formater'
import Markers_DataSets from './formater_Modules/Markers_DataSets_Formater'

//Plot Generator Modules
import Plot from './generator_Modules/PlotGenerator'

//UI Dashboard Modules
import AbelianHeader from './visualizer/Abelian_Header'
import HeaderDataFetcher from './visualizer/HeaderDataFetcher'
import HeaderIndicator from './visualizer/HeaderIndicatorFetcher'
import HeaderSimulation from './visualizer/HeaderSimulationFetcher'
import TradesHistory from './visualizer/TradesHistory'

function App() {
  // Initialize State Variable
  // const [IndicatorData, setIndicatorData] = useState({Loading: true})
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
  
  const CallbackIndicator = async (childData) => {
    let indicatorData = await POST('http://localhost:5001/RenderIndicator', {config: childData})
    console.log(indicatorData);
    let TestRendeering = Multiple_DataSets([indicatorData.Indicator],indicatorData.config)
    setPlotDataTraces([...PlotDataTraces, TestRendeering[0]])
  }


  const CallbackSimulation = async (childData) => {
    let SimData = await POST('http://localhost:5001/Simulation', {config: childData})
    let TestRendering = Markers_DataSets(SimData.Simulation,childData)
    setPlotDataTraces([...PlotDataTraces, TestRendering])
    setSimulationData({
      Simulation: SimData.Simulation,
      TradesListReadyToRender: true
    })
  }

  console.log(SimulationData);
  let OHLCChart = OHLCData.OHLCChartReadyToRender === false ? 
  <Alert variant='light'> <h4 style={{ }}>Loading Graph</h4> <Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Alert>  : 
    <Plot 
      dataSet={ PlotDataTraces }
      layoutSet={ PlotLayout.Layout }
    />
  
  // Initialise Dashboard
  let TradesList = SimulationData.TradesListReadyToRender === false ?
    <Alert variant='light'> <h4 style={{}}>Loading Simulation</h4><Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Alert> :
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
          {<HeaderDataFetcher childData={CallbackOHLC}/>}
        </Col>
      </Row>
      <Row>
        {OHLCChart}
      </Row>
      <Row>
        <Col>
          <HeaderIndicator childData={CallbackIndicator}/>
        </Col>
        <Col>
          <HeaderSimulation childData={CallbackSimulation}/>
        </Col>
      </Row>
      {TradesList}
    </div>
  );
}

export default App;