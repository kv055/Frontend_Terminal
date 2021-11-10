import {useState, useEffect} from 'react';
// Data Fetch module
import DataFetch from './fetch_Modules/DataFetch'
//DataSet Formater modules
import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'
import Simulator_Data_Formater from './formater_Modules/Simulator_Data_Formater'
import Simulator_Layout from './formater_Modules/Simulator_Layout_Formater'
import Strategy_Indicator_Layout from './formater_Modules/Strategy_Indicator_Layout'
import Strategy_Data_Formater from './formater_Modules/Markers_DataSets_Formater'
import Lines_Data_Formater from './formater_Modules/Line_DataSets_Formater'

import Multiple_DataSets from './formater_Modules/Multiple_Data_Sets_Formater'

//Plot Generator Modules
import Plot from './generator_Modules/PlotGenerator'
// import MultiplePlotsGenerator from './generator_Modules/MultiplePlotsGenerator'
//UI Dashboard Modules
import AbelianHeader from './visualizer/Abelian_Header'
import HeaderDataFetcher from './visualizer/HeaderDataFetcher'
import HeaderStrategyIndicator from './visualizer/HeaderStrategyIndicatorFetcher'
import HeaderSimulationFetcher from './visualizer/HeaderSimulationFetcher'
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

  // Initialise Plot Variables
  let LineChart = PlotData.Loading === true ? 
    <p>Loading</p>  : 
    <Plot 
      dataSet={[
        Strategy_Data_Formater(PlotData.Indicators[0]),
        Lines_Data_Formater(PlotData.Indicators[1]),
        Lines_Data_Formater(PlotData.Indicators[2])
      ]}
      layoutSet={Strategy_Indicator_Layout()}
    />
  let OHLCChart = PlotData.Loading === true ? 
    <p>Loading</p>  : 
    <Plot 
      dataSet={[
        OHLC_Data_Formater(PlotData.OHLC),
        Multiple_DataSets(PlotData.Indicators)[0],
        Simulator_Data_Formater(PlotData.Simulation)
      ]}
      layoutSet={OHLC_Layout()}
    />
  let SimulationChart = PlotData.Loading === true ?
    <p>Loading</p>  : 
    <Plot 
      dataSet={[Simulator_Data_Formater(PlotData.Simulation)]}
      layoutSet={Simulator_Layout()}
    />
      
  return (
    <div className="App">
      {<AbelianHeader />}
      {<HeaderDataFetcher />}
      {OHLCChart}
      <HeaderStrategyIndicator />
      {LineChart}
      <HeaderSimulationFetcher />
      {SimulationChart}
      {TradesList}
    </div>
  );
}

export default App;