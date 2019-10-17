import Data from '../assets/whisky_no_location.csv';

export class DistilleryGraph {
        constructor(args) {
            this.stats = args
            [this.distillery,
                this.body,
                this.sweet,
                this.smoky,
                this.medicinal,
                this.tobacco,
                this.honey,
                this.spicy,
                this.winey,
                this.nutty,
                this.malty,
                this.fruity,
                this.floral] = args

            this.container = d3.select("#distillery-graph-container")
                .append("svg")
                .attr("height", 800)
                .attr("width", 800);
        }

    drawAxes() {
        this.container.append("line")
            .attr("x1", "0")
            .attr("y1", "372")
            .attr("x2", "372")
            .attr("y2", "372")
            .style("stroke", "black")
            .style("stroke-width", 1);

        this.container.append("line")
            .attr("x1", "0")
            .attr("y1", "372")
            .attr("x2", "0")
            .attr("y2", "0")
            .style("stroke", "black")
            .style("stroke-width", 1);
    }

    drawBars(index, value) {
        if (value === 0) { value = 0.25}
        let color;
        if (value === 0) { color = '260B01' }
        if (value === 1) { color = '592816' }
        if (value === 2) { color = 'A65233' }
        if (value === 3) { color = 'D9895B' }
        if (value === 4) { color = 'F2E6D8' }
        this.container.append("rect")
            .attr("width", 10)
            .attr("height", 30)
            .style("fill", 'grey')
            .attr("y", index * 31)
            .attr("x", 0)
            .transition()
            .delay(100)
            .duration(1500)
            .style("fill", color)
            .attr("width", value * 100)
        }
    

    render() {
        const array = this.stats.slice(1)
        for (let i = 0; i < array.length; i++) {
            console.log(array[i])
            this.drawBars(i, array[i])
        }
        this.drawAxes();
    }
    
} 

// this.container.append("circle")
//     .attr("cx", 100)
//     .attr("cy", 50)
//     .attr("r", 10)
//     .style("fill", "yellow");

// d3.selectAll('circle')
//     .transition()
//     .delay(300)
//     .duration(1000)
//     .style('fill', 'red')
//     .attr('r', 50)