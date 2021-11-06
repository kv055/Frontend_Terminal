let dataFetcherHeader = () => {
    return(
        <div style={{
            borderBottom: 'solid',
            borderWidth: '2px'
        }}>
            <h2 style={{}}>Simulation:</h2>
            <ul>
                <li>
                    <p style={{
                        textAlign: 'left'
                }}>
                        Data-Source:
                    </p>
                </li>
                <li>
                    <p style={{textAlign: 'right'}}>Configuration:</p>
                </li>
            </ul>
        </div>
    )
}

export default dataFetcherHeader