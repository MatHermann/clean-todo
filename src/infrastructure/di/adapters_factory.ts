import IdGenerator from "../../domain/ports/utils/IdGenerator";
import MongooseIdGenerator from "../mongoose/adapters/MongooseIdGenerator";

export const getIdGenerator = (): IdGenerator => {
  return new MongooseIdGenerator();
};
