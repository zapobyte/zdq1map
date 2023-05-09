
import garai from '../assets/images/dw1/maps/garai.png';
import domdora from '../assets/images/dw1/maps/domdora.png';
import lotoCave from '../assets/images/dw1/maps/loto.png';
import garaisTomb from '../assets/images/dw1/maps/garais-tomb.png';
import Handlebars from 'handlebars';

interface PinContext {
    "name": string;
    "type": string[];
    "map": string;
    "dungeon_map": string;
}

export function generatePinHtml(data: PinContext) {

    const maps: any = {
        garai: {
            map: garai,
            dungeon_map: garaisTomb
        },
        loto: { dungeon_map: lotoCave },
        domdora: { map: domdora }
    }

    const source = `
        <h1 class="p-none m-none">{{name}}</h1>
        {{#each type}}
           <span class="badge badge-{{this}}">{{this}}</span>
        {{/each}}
        <div class="p-sm-top">
            {{#if map}}
                <details>
                    <summary class="p-sm-bottom">Town Map</summary>
                    <img src="{{map}}" class="border">
                </details>
            {{/if}}
            {{#if dungeon_map}}
                <details>
                <summary class="p-sm-bottom">Dungeon Map</summary>
                    <img src="{{dungeon_map}}" class="border">
                </details>
            {{/if}}
       </div> 
    `;
    const template = Handlebars.compile(source);

    const context: PinContext = {
        name: data.name,
        type: [...data.type],
        map: maps[data.map].map,
        dungeon_map: maps[data.map].dungeon_map
    }
    const html = template(context);
    return html;

}