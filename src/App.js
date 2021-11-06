import {useState, useEffect} from 'react';

// Data Fetch module
import DataFetch from './fetch_Modules/DataFetch'
//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout_Formater from './formater_Modules/OHLC_Layout_Formater'
import Simulator_Data_Formater from './formater_Modules/Simulator_Data_Formater'
import Multiple_DataSets from './formater_Modules/Multiple_Data_Sets_Formater'
import StrategyFormater from './formater_Modules/Strategy_DataSets_Formater'
//Plot Generator Modules
import OHLCPlot from './generator_Modules/OHLCPlotGenerator'
import MultipleSetsGenerator from './generator_Modules/MultipleDataSetsGenerator'
// import MultiplePlotsGenerator from './generator_Modules/MultiplePlotsGenerator'
//UI Dashboard Modules
import AbelianHeader from './visualizer/Abelian_Header'
import HeaderDataFetcher from './visualizer/HeaderDataFetcher'
import TradesHistory from './visualizer/TradesHistory'

function App() {
  // Initialize State Variable
  const [PlotData, setPlotData] = useState({Loading: true})
  // Initialize Fetch function
  let GetPlotData = async () => {
      let IndicatorFetched = await DataFetch('http://127.0.0.1:5000/Indicators')
      let OHLCFetched = await DataFetch('http://127.0.0.1:5000/OHLC')
      let SimulationFetched = await DataFetch('http://127.0.0.1:5000/Simulation')
    setPlotData({
      Indicators: IndicatorFetched.Indicators,
      OHLC: OHLCFetched.OHLC,
      Simulation: SimulationFetched.Simulation,
      Loading : false
    })
  }
  // Execute Fetch function and set State 
  useEffect(() => {
    GetPlotData()
  },[])
  console.log(PlotData);
  // Initialise Dashboard
  let TradesList = PlotData.Loading === true ?
    <p>Loading</p> :
    <TradesHistory 
      dataSet={PlotData.Simulation}
    />
  let LineChart = PlotData.Loading === true ? 
    <p>Loading</p>  : 
    <MultipleSetsGenerator 
      dataSet={[StrategyFormater(PlotData.Indicators)]}
    />
  let OHLCChart = PlotData.Loading === true ? 
    <p>Loading</p>  : 
    <OHLCPlot 
      dataSet={[
        OHLC_Data_Formater(PlotData.OHLC),
        Multiple_DataSets(PlotData.Indicators)[0],
        Simulator_Data_Formater(PlotData.Simulation)
      ]}
      layoutSet={OHLC_Layout_Formater()}
    />
  let SimulationChart = PlotData.Loading === true ?
    <p>Loading</p>  : 
    <MultipleSetsGenerator 
      dataSet={[Simulator_Data_Formater(PlotData.Simulation)]}
    />
      
  return (
    <div className="App">
      {<AbelianHeader />}
      {<HeaderDataFetcher />}
      {OHLCChart}
      {LineChart}
      {SimulationChart}
      {TradesList}
    </div>
  );
}

export default App;