export class Content {
    constructor () {
    }

    draw (data) {
        console.log(data)
        const svg = d3.select('.main-chart')
        svg.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('width', 300)
            .attr('height', 300)
    }

    render (cat) {
        d3.json('/assets/whisky-test.json').then( (data) => {
            // HERE! need to iterate through the types somehow, started
            //        working on category(), right now only displaying body
            //         stats for each region
            const category = type => Object.values(Object.values(data)[0])[0][type]
            console.log(category('smoky'))
            // HERE 

            const spey = 0
            const high = 1
            const low = 2
            const island = 3
            const islay = 4
            const ctown = 5

            d3.select('#content-container').append('svg').attr('class', 'main-chart')
            const svg = d3.select('.main-chart')
            const svgWidth = parseInt(svg.style("width"), 10)
            const svgHeight = parseInt(svg.style("height"), 10)

            const xScale = d3.scaleLinear()
                .domain([0, 8])
                .range([0, svgWidth])

            const yScale = d3.scaleBand()
                .domain(data.map(d => Object.keys(d)))
                .range([0, svgHeight])

            const selector = (d, cat) => ( Object.values(d)[0][cat] )

            const barChart = svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                    .attr('class', 'bar')
                    .attr('y', (d) => yScale(Object.keys(d)))
                    .attr('width', (d) => xScale(selector(d, 'smoky')))
                    .attr('height', (yScale.bandwidth() * 0.8))

            d3.select('#content-container')
                .append("h2")
                .text("Smoky")
        })
    }
}