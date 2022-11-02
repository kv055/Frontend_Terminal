import {useState} from 'react';
import {Alert, Col, Row ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// Data Fetch module
import POST from './fetch_Modules/DataFetchPOST'

//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'
import Multiple_DataSets from './formater_Modules/Multiple_Data_Sets_Formater'
// import Markers_DataSets from './formater_Modules/Markers_DataSets_Formater'
import RenderSeperateGraph from './formater_Modules/RenderSeperateGraph'
import Seperate_Layout from './formater_Modules/Seperate_Plot_Layout_formater'
import Simulation_DataTrace from './formater_Modules/Simulator_Data_Formater'

//Plot Generator Modules
import Plot from './generator_Modules/PlotGenerator'

//UI Dashboard Modules
import AbelianHeader from './visualizer/Abelian_Header'
import HeaderDataFetcher from './visualizer/HeaderDataFetcher'
import HeaderIndicator from './visualizer/HeaderIndicatorFetcher'
import HeaderSimulation from './visualizer/HeaderSimulationFetcher'
import TradesHistory from './visualizer/TradesHistory'

//Import and configure Environement variables
let baseURL = process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_DEPLOY_URL:
  process.env.REACT_APP_DEV_URL



function BackTestingModule(props) {
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
    // console.log(childData);
    let ohlcFetched = await POST(baseURL+'/Abelian_Terminal_post_ohlc_config_for_plotdata', childData.assetPair
        // candleSize: childData.ohlcConfig.candleSize 
    )
    setOHLCData({
       OHLCChartReadyToRender: true
     })
     setPlotLayout({Layout: OHLC_Layout(ohlcFetched.OHLC, ohlcFetched.config)})
     setPlotDataTraces([OHLC_Data_Formater(ohlcFetched.OHLC , ohlcFetched.config)])
  }
  
  const CallbackIndicatorFetch = async (childData) => {
    let indicatorData = await POST(baseURL+'/RenderIndicator', {config: childData})
    let Rendered = Multiple_DataSets([indicatorData.Indicator],indicatorData.config)
    let SeperateGraphNeeded = RenderSeperateGraph(indicatorData.config)

    if (SeperateGraphNeeded === true) {
      setSeperatePlot([Rendered[0]]) 
      setSeparatePlotLayout({Layout: Seperate_Layout(indicatorData.config)})
      setRedayToRenderSeperatePlot({readyToRender: true})
    } else {
      setPlotDataTraces([...PlotDataTraces, Rendered[0]])
    }
  }
  
  const deleteDataTraces = (id) => {
    console.log(id)
    let filtered = PlotDataTraces.filter(function(traceElement){
        return traceElement.id !== id})
    setPlotDataTraces(filtered)
  
    // //Now make sure Pricedata does not get rendered on Seperate Plot
    // let noMainPlotTraces = filtered.filter(function(traceElement){
    //   let ListofIndicatorsWhereSeperateGraphNeedsToBeRendered = [
    //     "PriceData",
    //     'ADX',
    //     'ADXR',
    //     'AROONOSC',
    //     'BOP',
    //     'CCI',
    //     'RSI'
    // ]  

    // let newFilter = []

    // ListofIndicatorsWhereSeperateGraphNeedsToBeRendered.forEach((element)=>{
    //   if (traceElement.name !== element) {
    //       newFilter.push(traceElement.name)
    //   } 
    // })
    // console.log(newFilter);
    // return newFilter
    // })
    
    // setSeperatePlot(filtered)
  }

  const CallbackSimulationFetch = async (childData) => {
    let SimData = await POST(baseURL+'/Simulation', {config: childData})
    let TestRendering = Simulation_DataTrace(SimData.Simulation,childData)
    setPlotDataTraces([...PlotDataTraces, TestRendering])
    setSimulationData({
      Simulation: SimData.Simulation,
      config: childData,
      TradesListReadyToRender: true
    })
  }


  let OHLCChart = OHLCData.OHLCChartReadyToRender === false ? 
  <Alert variant='light'> <Row className='row justify-content-center'> <h4 style={{textAlign: 'center'}}>Loading Graph</h4> <Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Row> </Alert>  : 
    <Plot 
      dataSet={PlotDataTraces}
      layoutSet={ PlotLayout.Layout }
    />
  
  let SeperaterPlotToRender = RedayToRenderSeperatePlot.readyToRender === false ?
  null :
  <Plot 
      dataSet={SeparatePlot}
      layoutSet={SeparatePlotLayout.Layout}
    />

  // Initialise Dashboard
  let TradesList = SimulationData.TradesListReadyToRender === false ?
    <Alert variant='light'> <Row className='row justify-content-center'> <h4 style={{textAlign: 'center'}}>Loading Simulation</h4><Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Row> </Alert> :
      <TradesHistory 
        dataSet={SimulationData.Simulation}
        config={SimulationData.config}
      />
  
  return (
    <div className="App">
      <Row>
        <Col>
          {<AbelianHeader SetBackend={props.Callback}/>}  
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
          <HeaderIndicator childData={CallbackIndicatorFetch} traces={PlotDataTraces} deleteTraces={deleteDataTraces}/>
        </Col>
        <Col>
          <HeaderSimulation childData={CallbackSimulationFetch} traces={PlotDataTraces} deleteTraces={deleteDataTraces}/>
        </Col>
      </Row>
      {TradesList}
    </div>
  );
}

export default BackTestingModule;