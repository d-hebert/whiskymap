import './styles/index.scss';
import { DistilleryGraph } from './scripts/distillery_graph'
import { Map } from './scripts/map'
 
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').innerText = "Hello World!";
    const map = new Map;
    map.render();
});

// const test = new Taste(['Belvenie', 3, 2, 1, 0, 0, 3, 2, 1, 0, 2, 2, 2]);
// test.render();