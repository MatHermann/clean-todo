import {v4} from "uuid";
import IdGenerator from "../../domain/ports/utils/IdGenerator";

export default class UuidGenerator implements IdGenerator {
  next(): string {
    return v4();
  }
}
