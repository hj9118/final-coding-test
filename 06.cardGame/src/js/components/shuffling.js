class Shuffling {
  constructor() {
    this.data = ['mura', 'gary', 'binky', 'licat', 'javadog'];
    this.parent = document.querySelector('.list-card');
  }

  setup() {
    this.shufflingCards();
  }

  shufflingCards() {
    let dataDouble = this.data.concat(this.data);

    while (dataDouble.length > 0) {
      const randomNum = Math.floor(Math.random() * dataDouble.length);
      if (dataDouble[randomNum]) {
        this.generateCards(dataDouble[randomNum]);
        dataDouble.splice(randomNum, 1);
      }
    }
  }

  generateCards(item) {
    const element = document.createElement('li');
    element.classList.add(item);
    element.dataset.name = item;
    this.parent.appendChild(element);
  }
}

export default Shuffling;
