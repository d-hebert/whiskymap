import Scotland from '../../assets/scotland.svg'

export class Map {
    constructor () {
        this.container = d3.select('#map-container')
            .append('svg')
            .attr('class', 'map-main')
    }

    attachMap () {
        d3.select(".map-main")
            .html(Scotland)
        d3.selectAll('path')
            .style('fill', 'whitesmoke')
    }

    addEvents () {
        d3.selectAll('path')
            .on('mouseover', () => this.handleMouseOver())
            .on('mouseout', () => this.handleMouseOut())
            .on('click', () => this.handleClick())
        d3.selectAll('rect')
            .on('click', () => this.resetZoom())
    }

    resetZoom () {
        d3.selectAll("path")
            .classed("active", false)
            .transition()
            .duration(1000)
            .style("stroke", "black")
            .style('fill', 'whitesmoke')
        d3.select("#map")
            .transition()
            .delay(100)
            .duration(1500)
            .attr("transform", "scale(1.3) translate(0, 0)")
        d3.select('h1')
            .transition()
            .delay(1200)
            .text('Scotland')
    }

    handleMouseOver (d, i) {
        const target = d3.event.target;
        const className = target.className.baseVal 
        d3.selectAll("." + className)
            .style('fill', '6c7f92')
    }

    handleMouseOut () {
        const target = d3.event.target
        const className = target.className.baseVal
        d3.selectAll("." + className)
            .style('fill', 'whitesmoke')
    }

    handleClick () {
        d3.select("#nessie-cover")
            .attr("class", "hide-her")
        d3.selectAll("path")
            .classed("active", false)
            .style("stroke", "none")
            .style('fill', '#whitesmoke')
        const target = d3.event.target
        const className = target.className.baseVal
        const zoom = this.zoom(className) 
        d3.select('h1')
            .transition()
            .delay(1200)
            .text(className)
            .style("text-transform", "capitalize")
        d3.select("#map")
            .transition()
            .delay(100)
            .duration(1500)
            .attr("transform", zoom)
        d3.selectAll("." + className)
            .attr("class", className + " active")
    }

    zoom (region) {
        if (region === 'speyside') {
            return("scale(5) translate(-500, -170)")
        } else if (region === 'highlands') {
            return ("scale(2.3) translate(-320, -100)")
        } else if (region === 'lowlands') {
            return ("scale(3) translate(-345, -300)")
        } else if (region === 'islands') {
            return ("scale(2) translate(-210, -90)")
        } else if (region === 'islay') {
            return ("scale(6) translate(-320, -340)")
        } else if (region === 'campbeltown') {
            return ("scale(6) translate(-340, -370)")
        }
    }
    render () {
        this.attachMap()
        this.addEvents()
    }
}