import './styles/index.scss';
import { Map } from './scripts/map'
import { Content } from './scripts/content'


window.addEventListener('DOMContentLoaded', () => {

    const map = new Map;
    map.render();

});

// const test = new Taste(['Belvenie', 3, 2, 1, 0, 0, 3, 2, 1, 0, 2, 2, 2]);
// test.render();

// const glencairn = d3.select('#glencairn-container')
//     .html(Glencairn)