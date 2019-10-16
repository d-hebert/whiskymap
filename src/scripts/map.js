import MapSVG from '../resources/main-map.svg'

export class Map {
    constructor () {
        this.container = d3.select('#map-container')
            .append('svg')
            .attr('class', 'map-main')
            .attr('height', '1000')
            .attr('width', '1000')
    }

    attachMap () {
        d3.select(".map-main")
            .html(MapSVG)
        d3.selectAll('path')
            .style('fill', 'grey')
    }

    addEvents () {
        d3.selectAll('path')
            .on('mouseover', () => this.handleMouseOver())
            .on('mouseout', () => this.handleMouseOut())
    }

    handleMouseOver (d, i) {
        console.log(d3.event.target.id)
        const target = d3.event.target
        d3.select(target)
            .style('fill', 'blue')
    }

    handleMouseOut () {
        const target = d3.event.target
        d3.select(target)
            .style('fill', 'grey')
    }
    render () {
        this.attachMap()
        this.addEvents()
    }
}