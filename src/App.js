import {useState} from 'react';
import {Alert, Col, Row ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// Data Fetch module
import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'

//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'
import Multiple_DataSets from './formater_Modules/Multiple_Data_Sets_Formater'
import Markers_DataSets from './formater_Modules/Markers_DataSets_Formater'
import RenderSeperateGraph from './formater_Modules/RenderSeperateGraph'
import Seperate_Layout from './formater_Modules/Seperate_Plot_Layout_formater'

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
  const [SimulationData, setSimulationData] = useState({TradesListReadyToRender: false})
  const [OHLCData, setOHLCData] = useState({OHLCChartReadyToRender: false})
  const [PlotDataTraces, setPlotDataTraces] = useState([])
  const [PlotLayout, setPlotLayout] = useState([])
  const [SeparatePlot,setSeperatePlot] = useState({readyToRender: false})
  const [RedayToRenderSeperatePlot,setRedayToRenderSeperatePlot] = useState({readyToRender: false})
  const [SeparatePlotLayout,setSeparatePlotLayout] = useState([])
 
  // Then wait till we get the necesary Data from the HeaderDataFetcher Component to start 
  // fetching OHLC Data (CallbackOHLC is a callback function that gets the data out of the Component)
  let CallbackOHLC = async (childData) =>{
    console.log(childData);
    let ohlcFetched = await POST('http://127.0.0.1:5001/OHLC', {
      ohlcConfig: { 
        exchange: childData.ohlcConfig.exchange.mic,
        assetPair: childData.ohlcConfig.assetPair.symbol,
        candleSize: childData.ohlcConfig.candleSize 
      }
    })
    setOHLCData({
       OHLCChartReadyToRender: true
     })
     setPlotLayout({Layout: OHLC_Layout(ohlcFetched.OHLC, ohlcFetched.config)})
     setPlotDataTraces([OHLC_Data_Formater(ohlcFetched.OHLC)])
  }
  
  const CallbackIndicatorFetch = async (childData) => {
    let indicatorData = await POST('http://localhost:5001/RenderIndicator', {config: childData})
    let Rendered = Multiple_DataSets([indicatorData.Indicator],indicatorData.config)
    let SeperateGraphNeeded = RenderSeperateGraph(indicatorData.config)
    console.log();
    if (SeperateGraphNeeded === true) {
      setSeperatePlot([...SeparatePlot,Rendered[0]]) 
      setSeparatePlotLayout({Layout: Seperate_Layout(indicatorData.config)})
      setRedayToRenderSeperatePlot({readyToRender: true})
    } else {
      setPlotDataTraces([...PlotDataTraces, Rendered[0]])
    }
  }
  // Todo: Callback Indicator Delete

  const CallbackSimulationFetch = async (childData) => {
    let SimData = await POST('http://localhost:5001/Simulation', {config: childData})
    let TestRendering = Markers_DataSets(SimData.Simulation,childData)
    setPlotDataTraces([...PlotDataTraces, TestRendering])
    setSimulationData({
      Simulation: SimData.Simulation,
      TradesListReadyToRender: true
    })
  }
//Todo: Callback Simulation Delete


  let OHLCChart = OHLCData.OHLCChartReadyToRender === false ? 
  <Alert variant='light'> <Row className='row justify-content-center'> <h4 style={{textAlign: 'center'}}>Loading Graph</h4> <Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Row> </Alert>  : 
    <Plot 
      dataSet={ PlotDataTraces }
      layoutSet={ PlotLayout.Layout }
    />
  
  let SeperaterPlotToRender = RedayToRenderSeperatePlot.readyToRender === false ?
  <p></p> :
  <Plot 
      dataSet={SeparatePlot}
      layoutSet={SeparatePlotLayout.Layout}
    />

  // Initialise Dashboard
  let TradesList = SimulationData.TradesListReadyToRender === false ?
    <Alert variant='light'> <Row className='row justify-content-center'> <h4 style={{textAlign: 'center'}}>Loading Simulation</h4><Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Row> </Alert> :
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
        {SeperaterPlotToRender}
      </Row>
      <Row>
        <Col>
          <HeaderIndicator childData={CallbackIndicatorFetch} traces={PlotDataTraces}/>
        </Col>
        <Col>
          <HeaderSimulation childData={CallbackSimulationFetch}/>
        </Col>
      </Row>
      {TradesList}
    </div>
  );
}

export default App;