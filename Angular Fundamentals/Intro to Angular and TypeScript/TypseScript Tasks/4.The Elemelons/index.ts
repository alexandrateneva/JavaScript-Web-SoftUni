import Watermelon from './Watermelon';
import Firemelon from './Firemelon';
import Airmelon from './Airmelon';
import Earthmelon from './Earthmelon';
import Melolemonmelon from './Melolemonmelon';

(function createMelons() {
    let watermelon = new Watermelon(12.5, "Kingsize");
    console.log(watermelon.toString());

    let firemelon = new Firemelon(5, 'Little');
    console.log(firemelon.toString());

    let airmelon = new Airmelon(9.7, 'Medium');
    console.log(airmelon.toString());

    let earthmelon = new Earthmelon(14.5, "Kingsize");
    console.log(earthmelon.toString());

    let melolemonmelon = new Melolemonmelon(10.1, 'Big');
    console.log(melolemonmelon.toString());
    melolemonmelon.morph();
    melolemonmelon.morph();
    console.log(melolemonmelon.toString());
})();
