import {DiagramModel} from "storm-react-diagrams";

export default class WorkflowGraphModel extends DiagramModel {

  isValid = () => Object.values(this.nodes).find(node => !node.isValid()) == null;

}
