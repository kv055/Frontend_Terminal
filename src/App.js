import {useState, useEffect} from 'react';
import DataFetch from './fetch_Modules/DataFetch'

//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout_Formater from './formater_Modules/OHLC_Layout_Formater'
// import Line_Data_Formater from './formater_Modules/Line_Data_Formater'
import Simulator_Data_Formater from './formater_Modules/Simulator_Data_Formater'
import Multiple_DataSets from './formater_Modules/Multiple_Data_Sets_Formater'

//Plot Generator Modules
import OHLCPlot from './generator_Modules/OHLCPlotGenerator'
// import LinePlot from './generator_Modules/LinePlotGenerator'
import BarPlot from './generator_Modules/BarPlotGenerator'
import MultipleSetsGenerator from './generator_Modules/MultipleDataSetsGenerator'
// import MultiplePlotsGenerator from './generator_Modules/MultiplePlotsGenerator'

function App() {

  // Get OHLC Data, formate it for Plotly and write it into a State-Variable
  //Fetch and save Indicator Data
  const [Indicator, setIndicator] = useState({
    isLoading: true
  })

  useEffect(() => {
    let asyncRuntime = async () => {
      let setter = await DataFetch('http://127.0.0.1:5000/Indicators')
      let newIndicator = {
        isLoading: false,
        data: setter
      }
      setIndicator(newIndicator)
    }
    asyncRuntime()
  },[])

  //Fetch and save OHLC Data
  const [OHLC, setOHLC] = useState({
    isLoading: true
  })
  
  useEffect(() => {
    let asyncRuntime = async () => {
      let setter = await DataFetch('http://127.0.0.1:5000/OHLC')
      let newOHLC = {
        isLoading: false,
        data: setter
      }
      setOHLC(newOHLC)
    }
    asyncRuntime()
  },[])  

  //Fetch and save Simulator Data
  const [Simulation, setSimulation] = useState({
    isLoading: true
  })

  useEffect(() => {
    let asyncRuntime = async () => {
      let setter = await DataFetch('http://127.0.0.1:5000/Simulation')
      let newSimulaton = {
        isLoading: false,
        data: setter
      }
      setSimulation(newSimulaton)
    }
    asyncRuntime()
  },[])

  // LineCharts with multiple Sets
  let LineChart = Indicator.isLoading === true ? 
    <p>Loading</p>  : 
    <MultipleSetsGenerator 
      dataSet={Multiple_DataSets(Indicator.data.Indicators)}
    />

  let OHLCChart = OHLC.isLoading === true ? 
    <p>Loading</p>  : 
    <OHLCPlot 
      dataSet={[
        OHLC_Data_Formater(OHLC.data.OHLC),
        Multiple_DataSets(Indicator.data.Indicators)[0],
        Simulator_Data_Formater(Simulation.data.Simulation)
      ]}
      layoutSet={OHLC_Layout_Formater()}
    />

  let SimulationChart = Simulation.isLoading === true ?
    <p>Loading</p>  : 
    <BarPlot 
      dataSet={[Simulator_Data_Formater(Simulation.data.Simulation)]}
    />

  return (
    <div className="App">
      {OHLCChart}
      {LineChart}
      {SimulationChart}
    </div>
  );
}

export default App;