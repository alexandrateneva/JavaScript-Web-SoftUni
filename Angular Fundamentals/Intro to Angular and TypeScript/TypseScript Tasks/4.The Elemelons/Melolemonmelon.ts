import Melon from './Melon';
const names = ['Water', 'Fire', 'Earth', 'Air'];

export default class Melolemonmelon extends Melon {
    private index: number;

    constructor(weight: number, melonSort: string) {
        super('Water', weight, melonSort);
        this.index = 0;
    }

    morph(): void {
        if (this.index < 3) {
            this.index++;
        } else {
            this.index = 0;
        }
        this.name = names[this.index];
    }
}