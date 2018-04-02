export function addTextToBody(text) {
  const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
}

/*
 export default class addText {

    constructor(text) {
        this.text = text;
    }



    addTextToBody() {
        let div = document.createElement('div');
        div.textContent = this.text;
        document.body.appendChild(this.div);
    }
}
*/