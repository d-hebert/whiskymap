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
        const regions = [
            'Speyside', 'Highland', 'Lowland', 'Island', 'Islay', 'Campbeltown'
        ]
        d3.select('#content-container')
            .append('h2')
            .text('Select a region')
        const dropdown = d3.select('#content-container').append('div').append('select')
        dropdown.selectAll('option')
            .data(regions)
            .enter()
                .append('option')
                .attr('value', d => {return d})
                .text(d => { return d })
        dropdown.on('change', () => {
            const region = d3.event.target.selectedOptions[0].value
            this.reduceSelection(region)
        })

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
        d3.select('#content-container')
            .append("h4")
            .text("Average tasting profile:")

        d3.json('../assets/whisky-test.json').then( (data) => {
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
        d3.json('../assets/whisky-test.json').then( (data) => {
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

<<<<<<< HEAD
            const selector = (d) => ( Object.values(d)[0][cat] )
=======
            const yScaleText = d3.scaleBand()
                .domain(data.map(d => Object.keys(d)))
                .range([0, svgHeight])

            // Helper method to dynamically gather data for category variable
            const selector = (d) => ( Object.values(d)[0][cat] )
            const name = (d) => ( Object.keys(d)[0])
>>>>>>> master

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