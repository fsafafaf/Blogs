import { once } from "lodash";
import Add from "./add.js";
import Multiply from "./multiply.js";

const onceAdd = once(Add);
const addResult = onceAdd(1, 2);
const multiplyResult = Multiply(2, 3);

console.log(addResult);
console.log(multiplyResult);
