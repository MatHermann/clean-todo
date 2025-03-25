import {Types} from "mongoose";
import IdGenerator from "../../../domain/ports/utils/IdGenerator";

export default class MongooseIdGenerator implements IdGenerator {
  next(): string {
    return new Types.ObjectId().toString();
  }
}
