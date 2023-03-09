import ColaGenerator from "./components/colaGenerator.js";
import Vendingmachine from './components/vendingmachine.js';

const colaGeneractor = new ColaGenerator();
const vendingmachineFunc = new Vendingmachine();

colaGeneractor.setup();
vendingmachineFunc.setup();