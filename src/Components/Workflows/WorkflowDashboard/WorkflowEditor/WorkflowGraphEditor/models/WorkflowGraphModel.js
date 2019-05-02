import {DiagramModel} from "storm-react-diagrams";

export default class WorkflowGraphModel extends DiagramModel {

  isValid = () => Object.values(this.nodes)
    .find(node => !node.isValid()) == null;

  isNewIdValid = (newId) => newId.length > 0 && !this.getNode(newId);

  replaceBlockId = (node, newId) => {
    const oldId = node.id;
    node.id = newId;
    this.nodes[newId] = node;
    delete this.nodes[oldId];
  }

}
