// import : 사용할 모듈을 우리가 사용할 스크립트로 가져옵니다.
import StarPoint from "./Components/starPoint.js";
import Favorite from "./Components/favorite.js";

const starPoint = new StarPoint();
const favorite = new Favorite();

starPoint.setup();
favorite.setup();