import {DefaultPortFactory} from "storm-react-diagrams";
import BlockPortModel from "../models/BlockPortModel";

export default class BlockPortFactory extends DefaultPortFactory{

  getNewInstance(initialConfig) {
    return new BlockPortModel();
  }
}
