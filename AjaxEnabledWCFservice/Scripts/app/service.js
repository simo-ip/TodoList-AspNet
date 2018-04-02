export default class Service {
    constructor(url) {
        this.url = url;
    }

    async getData() {
        console.log(this.url + ' makes a noise.');
        let y = await fetch(this.url);
        y = await y.json();
        console.log(y);
        return y;
    }
}