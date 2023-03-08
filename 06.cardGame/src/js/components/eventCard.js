class EventCard {
  constructor() {
    this.cards = document.querySelector('.list-card');
    this.cardEl = [];
  }
  setup() {
    this.bindEvents();
  }
  bindEvents() {
    this.cards.addEventListener('click', (event) => {
      const elClicked = event.target;

      if (elClicked.tagName === 'LI') {
        // 카드 클릭
        if (this.cardEl.length < 2 && this.cardEl[0] !== elClicked) {
          // 데이터가 2개 미만, 중복 클릭이 아님
          this.cardEl.push(elClicked);
          // 클릭 카드 저장
          elClicked.classList.add('on');
          // 카드를 뒤집음

          if (this.cardEl.length === 2) {
            setTimeout(() => {
              this.cardEl.forEach((item) => {
                if (this.cardEl[0].dataset.name === this.cardEl[1].dataset.name) {
                  // 같은 카드 선택
                  item.style.visibility = 'hidden';
                } else {
                  // 다른 카드 선택
                  item.classList.remove('on');
                }
              });
              this.cardEl.splice(0); // 비교 데이터 삭제
            }, 500);
          }
        }
      }
    });
  }
}

export default EventCard;
