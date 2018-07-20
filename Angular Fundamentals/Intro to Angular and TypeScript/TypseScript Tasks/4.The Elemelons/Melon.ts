export default abstract class Melon {
    protected name: string;
    public weight: number;
    public melonSort: string;
    readonly elementIndex: number;

    constructor(name, weight, melonSort) {
        this.name = name;
        this.weight = weight;
        this.melonSort = melonSort;
        this.elementIndex = this.weight * this.melonSort.length;
    }

    toString(): string {
        let str = `Element: ${this.name}\n` + `Sort: ${this.melonSort}\n` + `Element Index: ${this.elementIndex.toFixed(2)}\n`;
        return str;
    }
}