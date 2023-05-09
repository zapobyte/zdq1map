import Handlebars from 'handlebars';
import armors from '../assets/armors.json';
import chain_mail from '../assets/images/dw1/armors/chain_mail.png';
import clothes from '../assets/images/dw1/armors/clothes_th.png';
import loto from '../assets/images/dw1/armors/erdricks_roto_loto.png';
import full_plate_steel_armor from '../assets/images/dw1/armors/full_plate_steel_armor.png';
import half_plate_iron_armor from '../assets/images/dw1/armors/half_plate_iron_armor.png';
import leather_armor_th from '../assets/images/dw1/armors/leather_armor_th.png';
import magic_armor_th from '../assets/images/dw1/armors/magic_armor_th.png';

const IMG_ARMORS: any = {
    chain_mail: chain_mail,
    clothes_th: clothes,
    edricks_roto_logo: loto,
    full_plate_steel_armor: full_plate_steel_armor,
    half_plate_iron_armor: half_plate_iron_armor,
    leather_armor_th: leather_armor_th,
    magic_armor_th: magic_armor_th
}

export const generateArmorsHTML = () => {


    interface Armor {
        "name": string;
        "buy": string;
        "sell": string;
        "defense": string;
        "found": string;
        "img": string;
    }

    const source = `
        <h1>List Armors </h1>
        <table>
            <tr class="text-left">
                <th class="item"></th>
                <th class="item">Name</th>
                <th class="item">Buy</th>
                <th class="item">Sell</th>
                <th class="item">Defense</th>
                <th class="item">Found</th>
            </tr>
            {{#each this}}
                <tr class="text-left">
                    <td class="item item-armor text-center">
                        <img src="{{img}}"/>
                    </td>
                    <td class="item item-armor">
                        {{name}}
                    </td>
                    <td class="item item-armor">
                        {{buy}}
                    </td>
                    <td class="item item-armor">
                        {{sell}}
                    </td>
                    <td class="item item-armor">
                        {{defense}}
                    </td>
                    <td class="item item-armor">
                        {{found}}
                    </td>
                </tr>
            {{/each}}
        </table>
    `;

    const context: Armor[]= armors.map((armor: Armor)=> {
        return {
            ...armor,
            img: IMG_ARMORS[armor.img]
        }
    });

    const template = Handlebars.compile(source);
    const html = template(context);

    return html;

}