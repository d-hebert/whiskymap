import './styles/index.scss';
import { Taste } from './scripts/tasting_graph'

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').innerText = "Hello World!";
    const test = new Taste(['Belvenie', 3, 2, 1, 0, 0, 3, 2, 1, 0, 2, 2, 2]);
    test.render();
});
