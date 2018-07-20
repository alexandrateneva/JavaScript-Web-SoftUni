import Melon from './Melon';

export default class Watermelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super('Water', weight, melonSort);
    }
}