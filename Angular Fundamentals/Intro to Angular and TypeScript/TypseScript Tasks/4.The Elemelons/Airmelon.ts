import Melon from './Melon';

export default class Airmelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super('Air', weight, melonSort);
    }
}