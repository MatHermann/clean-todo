import IdGenerator from "../../domain/ports/utils/IdGenerator";
// import MongooseIdGenerator from "../mongoose/adapters/MongooseIdGenerator";
import UuidGenerator from "../uuid/UuidGenerator";

export const getIdGenerator = (): IdGenerator => {
  // return new MongooseIdGenerator();
  return new UuidGenerator();
};
