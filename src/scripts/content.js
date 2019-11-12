import { regionDescriptions } from './descriptions'

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

    initialRender () {
        const container = d3.select('#content-container').append('div')
            .attr('id', 'content-desc')
        container.append('h3')
            .text('Click on the map to explore the regions of Scotch whisky')
    }

    reduceSelection (val) {
        const regions = [
            'Speyside', 'Highlands', 'Lowlands', 'Islands', 'Islay', 'Campbeltown'
        ]

        if (regions.includes(val)) {
            const idx = regions.indexOf(val)
            console.log('region selected: ' + val)
            this.renderRegion(val, idx)
        } else {
            console.log('tasting category selected: ' + val)
            this.renderCategory(val)
        }
    }

    renderRegion (region, idx) {
        const container = d3.select('#content-container')
        const highlights = regionDescriptions[region].highlights
        const description = regionDescriptions[region].blurb
        container
            .append('div')
            .attr('id', 'content-desc')
            .append('div')
                .attr('id', 'content-blurb')
                .text(description)
        container
            .append("h4")
            .text("Average profile:")

        d3.json('https://raw.githubusercontent.com/d-hebert/whiskymap/master/assets/whisky-test.json').then( (data) => {
            d3.select('#content-container').append('svg').attr('class', 'main-chart')
            const svg = d3.select('.main-chart')
            const svgWidth = parseInt(svg.style("width"), 10)
            const svgHeight = parseInt(svg.style("height"), 10)
            const reducedData = data[idx]
            const selector = Object.entries(Object.values(reducedData)[0])
            console.log(selector.map(sub => sub[0]))
            const xScale = d3.scaleLinear()
                .domain([0, 8])
                .range([0, svgWidth])
            
            const yScale = d3.scaleBand()
                .domain(selector.map(sub => sub[0]))
                .range([0, svgHeight])

            const yScaleText = d3.scaleBand()
                .domain(selector.map(sub => sub[0]))
                .range([0, svgHeight])

            console.log(selector)
            const barChart = svg.selectAll('rect')
                .data(selector)
                .enter().append('g').attr('class', 'bar')
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('y', d => yScale(d[0]))
                    .attr('height', (yScale.bandwidth() * 0.8))
                    .attr('width', 10)
                    .transition()
                    .delay(100)
                    .duration(1200)
                    .attr('width', (d) => {
                    let n = xScale(d[1])
                    if (n > 10) { return n * 1.2 }
                    if (n < 10) { return 15 }
                    })

            d3.selectAll('g.bar')
                .append('text')
                .attr('class', 'bar-label')
                .attr('x', 12)
                .attr('y', (d) => (yScaleText(d[0]) + yScale.bandwidth() * 0.6))
                .attr('text-anchor', 'left')
                .text((d) => d[0])
                .style('fill', 'white')

        })
    }

    renderCategory (cat) {
        d3.json('https://raw.githubusercontent.com/d-hebert/whiskymap/master/assets/whisky-test.json').then( (data) => {
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

            const yScaleText = d3.scaleBand()
                .domain(data.map(d => Object.keys(d)))
                .range([0, svgHeight])

            // Helper method to dynamically gather data for category variable
            const selector = (d) => ( Object.values(d)[0][cat] )
            const name = (d) => ( Object.keys(d)[0])

            // Bars are drawn below:
            const barChart = svg.selectAll('rect')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'bar')
                    .append('rect')
                        .attr('class', 'bar')
                        .attr('y', (d) => yScale(Object.keys(d)))
                        .attr('height', (yScale.bandwidth() * 0.6))
                        .attr('width', 10)
                        .transition()
                        .delay(100)
                        .duration(1200)
                        .attr('width', (d) => { 
                            let n = xScale(selector(d)) 
                            if (n > 10) { return n * 1.2 }
                            if (n < 10) { return 15 }
                            })

            d3.selectAll('g.bar')
                .append('text')
                .attr('class', 'bar-label')
                .attr('x', 12)
                .attr('y', (d) => (yScaleText(Object.keys(d)) + yScale.bandwidth() * 0.4))
                .attr('text-anchor', 'left')
                .text(function (d) { return name(d) })
                .style('fill', 'white')

            d3.select('#content-container')
                .append("h2")
                .text(cat)
        })
    }
}