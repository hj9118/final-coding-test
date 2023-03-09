class Vendingmachine {
  constructor() {
    this.btnPut = document.querySelector('.btn-put');
    this.myMoney = document.querySelector('.txt-mymoney');
    this.balance = document.querySelector('.txt-balance');
    this.itemList = document.querySelector('.list-item');
    this.inputCostEl = document.querySelector('.inp-put');
    this.btnReturn = document.querySelector('.btn-return');
    this.btnGet = document.querySelector('.btn-get');
    this.stagedList = document.querySelector('.cont-get .list-item-staged');
    this.gotList = document.querySelector('.cont-myitems .list-item-staged');
    this.txtTotal = document.querySelector('.txt-total');
  }

  setup() {
    this.bindEvents();
  }

  stagedItemGenerator(target) {
    // 선택한 음료수 목록 생성
    const stagedItem = document.createElement('li');
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;
    stagedItem.innerHTML = `
          <img src="./src/images/${target.dataset.img}" alt="" class="img-item">
          <strong class="txt-item">${target.dataset.item}</strong>
          <span class="num-counter">1</span>
      `;
    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    this.btnPut.addEventListener('click', (event) => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.innerText.replace(',', ''));
      const balanceVal = parseInt(this.balance.innerText.replace(',', ''));

      if (inputCost) {
        // 돈 입금
        if (inputCost <= myMoneyVal) {
          // 입금액 < 소지금
          this.myMoney.innerText =
            new Intl.NumberFormat().format(myMoneyVal - inputCost) + ' 원'; //Intl.NumberFormat : 언어에 맞는 숫자 서식을 문자열로 반환합니다. IE11 부터 지원
          this.balance.innerText =
            new Intl.NumberFormat().format(
              (balanceVal ? balanceVal : 0) + inputCost
            ) + ' 원'; // balanceVal = NaN? 0원
          this.inputCostEl.value = null;
        } else {
          // 입금액 > 소지금
          alert('소지금이 부족합니다.');
          this.inputCostEl.value = null;
        }
      }
    });

    /* 2. 거스름돈 반환 버튼 기능 */

    this.btnReturn.addEventListener('click', (event) => {
      const balanceVal = parseInt(this.balance.innerText.replace(',', ''));
      const myMoneyVal = parseInt(this.myMoney.innerText.replace(',', ''));

      if (balanceVal) {
        this.myMoney.innerText =
          new Intl.NumberFormat().format(myMoneyVal + balanceVal) + ' 원';
        this.balance.innerText = '원';
      }
    });

    /* 3. 아이템 리스트 */
    this.itemList.addEventListener('click', (event) => {
      const targetEl = event.target;
      const balanceVal = parseInt(this.balance.innerText.replace(',', ''));
      const targetElBtn = targetEl.querySelector('.btn-item');
      let isStaged = false;

      if (targetEl.tagName === 'LI') {
        const targetElPrice = parseInt(targetElBtn.dataset.price);
        if (balanceVal >= targetElPrice) {
          // 입금액 >= 음료수
          this.balance.innerText =
            new Intl.NumberFormat().format(balanceVal - targetElPrice) + ' 원';

          if (this.stagedList.querySelectorAll('li').length > 0) {
            // 선택 음료가 있을 경우
            this.stagedList.querySelectorAll('li').forEach((item) => {
              // 클릭시 선택한 아이템인지 파악
              if (item.dataset.item === targetElBtn.dataset.item) {
                // 클릭 상품 = 담아둔 상품
                item.querySelector('.num-counter').innerText++;
                isStaged = true;
                return;
              }
            });

            if (!isStaged) {
              // 첫 선택
              this.stagedItemGenerator(targetElBtn);
            }
          } else {
            this.stagedItemGenerator(targetElBtn);
          }

          targetElBtn.dataset.count--;
          if (targetElBtn.dataset.count == 0) {
            targetEl.classList.add('sold-out');
          }
        } else {
          alert('잔액이 부족합니다. 돈을 입금해주세요.');
        }
      }
    });

    /* 획득 버튼 */
    this.btnGet.addEventListener('click', (event) => {
      let isGot = false;
      let totalPrice = 0;
      this.stagedList.querySelectorAll('li').forEach((itemStaged, index) => {
        this.gotList.querySelectorAll('li').forEach((itemGot) => {
          let itemGotCount = itemGot.querySelector('.num-counter');
          // 이미 가진 아이템인지 파악
          if (itemStaged.dataset.item === itemGot.dataset.item) {
            // 아이템 갯수 업데이트
            itemGotCount.innerText =
              parseInt(itemGotCount.innerText) +
              parseInt(itemStaged.querySelector('.num-counter').innerText);
            this.stagedList.removeChild(itemStaged); // 리스트에서 제거
            isGot = true;
            return;
          }
        });
        if (!isGot) {
          this.gotList.appendChild(itemStaged);
        }
      });

      // 총액 계산
      this.gotList.querySelectorAll('li').forEach((itemGot) => {
        totalPrice +=
          itemGot.dataset.price *
          parseInt(itemGot.querySelector('.num-counter').innerText);
      });
      this.txtTotal.innerText = `총금액 : ${new Intl.NumberFormat().format(
        totalPrice
      )}원`;
    });
  }
}

export default Vendingmachine;
