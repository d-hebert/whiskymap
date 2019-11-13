import './styles/index.css';
import { Map } from './scripts/map'
import { Content } from './scripts/content'


window.addEventListener('DOMContentLoaded', () => {

    const map = new Map;
    map.render();
    const content = new Content;
    content.initialRender();

});