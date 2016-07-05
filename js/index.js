const { VictoryChart, VictoryLine, VictoryAxis, VictoryArea, VictoryStack } = Victory

function formatTime(timestamp) {
    const date = new Date(timestamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return (hours%12) + ":" + (minutes > 9 ? minutes : '0'+minutes) + " " + (hours > 12 ? 'pm' : 'am')
}

function formatPerformance(ms) {
    return ms + " ms"
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timestamp : Date.now()
        }
    }

    onHover: () => {

    };

    render() {
        const { timestamp } = this.state

        const ticks = new Array(5).fill(1).map((n, i) => timestamp + i*5*60000)
        const data1 = new Array(30).fill(1).map((n, i) => { return { x: i, y: i*2*(Math.random()) } })
        const data2 = new Array(30).fill(1).map((n, i) => { return { x: i, y: i*2*(Math.random()) } })
        const data3 = new Array(30).fill(1).map((n, i) => { return { x: i, y: i*2*(Math.random()) } })

        return (
            <svg width={800} height={400}>
                <VictoryAxis 
                    tickValues={ticks} 
                    tickFormat={formatTime} /> 

                <VictoryAxis 
                    dependentAxis
                    style={{
                        grid: {
                            stroke: "grey",
                            strokeWidth: 1
                        }
                    }}
                    tickCount={3}
                    domain={[0, 1000]}
                    tickFormat={formatPerformance}  
                    events={[ { target: "grid", eventHandlers: { onMouseOver: event => console.log('event') } } ]} />

                <VictoryArea 
                    interpolation="natural"
                    style={{data: {fill: "teal", opacity: 0.3}}}
                    data={data1}/>
                
                <VictoryArea 
                    style={{data: {fill: "tomato", opacity: 0.3}}}
                    data={data2}/>

                <VictoryArea 
                    style={{data: {fill: "green", opacity: 0.3}}}
                    events={[ { target: "data", eventHandlers: { onClick: () => { return [ { mutation: (props) => { return {style: Object.assign({}, props.style, {fill: "orange"})}; } } ]; } } } ]}
                    data={data3}/>
            </svg>

        );
    }
}

ReactDOM.render(<App/>, document.getElementById('example'))
