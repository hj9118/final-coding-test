const starImageSourceMap = {
  empty: './src/images/icon_empty_star.png',
  harf: './src/images/icon_half_star.png',
  full: './src/images/icon_star.png'
};

class StarPoint {

  constructor() {
      this.starContentElement = document.querySelector('.content-star');
      this.starBackgroundElement = this.starContentElement.querySelector('.star-background');
       this.starImages = Array.from(this.starBackgroundElement.querySelectorAll('img')); // 별점 백그라운드 이미지 목록
      this.starImages = this.starBackgroundElement.querySelectorAll('img');
      this.starPointResetButton = this.starContentElement.querySelector('.icon-remove-star');
      this.lockedStarPoint = false; // 별점이 고정되어 있는지 아닌지 상태 
  }

  setup() {
      this.bindEvents();
  }

  // 별점이 고정되어 있는 상태
  lockStarPoint() {
      this.lockedStarPoint = true;
  }

  // 별점이 고정되어 있지 않은 상태
  unlockStarPoint() {
      this.lockedStarPoint = false;
  }

  // 별점의 상태를 반환
  isLockedStarPoint() {
      return this.lockedStarPoint;
  }

  bindEvents() {
      this.starBackgroundElement.addEventListener('mousemove', (event) => {

          // offsetX : 타겟 요소에서의 마우스 포인터의 X축 위치를 반환
          const { target, offsetX: currentUserPoint } = event;

          // 별점이 고정되어 있다면 이벤트 핸들링 반응 없음
          if (this.isLockedStarPoint()) {
              return;
          }

          const { point } = target.dataset;
          const starPointIndex = parseInt(point, 10) - 1;
          const [starImageClientRect] = target.getClientRects();
          //getClientRects() : 요소의 좌표와 크기에 대한 정보를 반환. target.getClientRects()[0] 값만 사용하기 위해 구조분해 할당 이용
          const starImageWidth = starImageClientRect.width;
          const isOverHarf = starImageWidth / 2 < currentUserPoint;

          this.renderStarPointImages({ drawableLimitIndex: starPointIndex, isOverHarf });
      });

      // 클릭시 별점 고정
      this.starBackgroundElement.addEventListener('click', () => this.lockStarPoint());

      // 리셋
      this.starPointResetButton.addEventListener('click', () => {
          this.unlockStarPoint();
          this.resetStarPointImages();
      });

      //  && 연산자: 첫번째 피연산자 true: 두번째 피연산자 반환
      //             첫번째 피연산자 false: 첫번째 피연산자 반환
      // 마우스 아웃 시 별점이 고정인 상태가 아니라면 resetStarPointImages()으로 별점 초기화. 
      this.starBackgroundElement.addEventListener('mouseout', () => !this.isLockedStarPoint() && this.resetStarPointImages());
  }

  // 별점 이미지 랜더링 함수 
  renderStarPointImages(payload = {}) {  // 초기값 할당
      const { drawableLimitIndex = -1, isOverHarf = false } = payload;  // 초기값 할당

      // NodeList !== Array NodeList를 배열로 사용할 수 없을 수 있음
      // call: Array ➡ NodeList 재할당
      Array.prototype.forEach.call(this.starImages, (starImage, index) => { // 별 이미지를 순환
          //this.starImages.forEach((starImage, index) => {

          // 현재 순환 순서보다 마우스가 호버된 별의 인덱스가 크다면 꽉찬 별, 아니면 빈 별. 
          let imageSource = index < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;

          // 현재 순환 순서와 마우스가 호버된 별의 인덱스가 같다면
          if (drawableLimitIndex === index) {
              // 마우스 포인터의 위치가 별점의 중간을 넘어섰다면 꽉찬별, 아니면 반쪽 별
              imageSource = isOverHarf ? starImageSourceMap.full : starImageSourceMap.harf;
          }
          // 순환중인 이미지에 src 값 할당
          starImage.src = imageSource;
      });
  }

  // 별점 제거
  resetStarPointImages() {
      this.renderStarPointImages();
  }
}
export default StarPoint;