
import Garai from '../assets/images/dw1/maps/garai.png';
import Domdora from '../assets/images/dw1/maps/domdora.png';
import LotoCave from '../assets/images/dw1/maps/loto.png';
import GaraisTomb from '../assets/images/dw1/maps/garais-tomb.png';
import TantegelCastel from '../assets/images/dw1/maps/radatome-castle-4.png';
import TantegelTown from '../assets/images/dw1/maps/radatome-town-4.png';
import Rimuldar from '../assets/images/dw1/maps/rimuldar-4.png';
import Mercado from '../assets/images/dw1/maps/mercado-4.png';
import Kol from '../assets/images/dw1/maps/maira-4.png';
import DracolordCastle from '../assets/images/dw1/maps/dracolords-castle.png';
import RockyCave from '../assets/images/dw1/maps/rocky-cave.png';
import SwampyCave from '../assets/images/dw1/maps/marshy-cave.png';
import HolySanctum from '../assets/images/dw1/maps/holyshrine.png';
import RainShrine from '../assets/images/dw1/maps/shrineofrain.png';

import Handlebars from 'handlebars';

interface PinContext {
    "name": string;
    "type": string[];
    "map"?: string;
    "dungeon_map"?: string;
    "shrine_map"?: string;
    "description": string;
}

interface Map { 
    [key: string]: {
        map?: string;
        dungeon_map?: string;
        shrine_map?: string;
    }
}
export function generatePinHtml(data: PinContext) {

    const maps: Map = {
        garai: {
            map: Garai,
            dungeon_map: GaraisTomb
        },
        tantegelCastel: {map: TantegelCastel},
        loto: { dungeon_map: LotoCave },
        tantegelTown: { map: TantegelTown },
        rimuldar: {map:Rimuldar},
        mercado: {map:Mercado},
        kol: {map:Kol},
        dracolordCastle: {dungeon_map: DracolordCastle},
        domdora: { map: Domdora },
        rocky: {dungeon_map: RockyCave},
        swampy: {dungeon_map: SwampyCave},
        holySanctum: {shrine_map: HolySanctum},
        rainShrine: {shrine_map: RainShrine}
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
            {{#if shrine_map}}
                <details>
                <summary class="p-sm-bottom">Shrine Map</summary>
                    <img src="{{shrine_map}}" class="border">
                </details>
            {{/if}}

            <div class="">
                <h3>Description</h3>
                <p>{{description}}</p>
            </div>
       </div> 
    `;
    const template = Handlebars.compile(source);

    let contextMaps:any = {};
    if(data.map){
        contextMaps = {
            map: maps[data.map].map!,
            dungeon_map: maps[data.map].dungeon_map!,
            shrine_map: maps[data.map].shrine_map!
        }
    }
    
    const context: PinContext = {
        name: data.name,
        type: [...data.type],
        ...contextMaps,
        description: data.description
    }
    const html = template(context);
    return html;

}