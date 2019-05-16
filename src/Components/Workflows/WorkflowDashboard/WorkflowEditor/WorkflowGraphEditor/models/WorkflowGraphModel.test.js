import WorkflowGraphModel from "./WorkflowGraphModel";
import {DefaultBlockNodeModel} from "./DefaultBlockNodeModel";

describe('test generation of block labels', () => {
  it("should generate the label 'block_0' for the first block", () => {
    // given
    const model = new WorkflowGraphModel();

    // when
    const label = model.getNextBlockLabel();

    // then
    expect(label).toBe('block_0');
  });

  it("should generate the label 'block_1' for the second block", () => {
    // given
    const model = new WorkflowGraphModel();
    model.addNode(new DefaultBlockNodeModel());

    // when
    const label = model.getNextBlockLabel();

    // then
    expect(label).toBe('block_1');
  })
});

describe('test validation of user provided block label', () => {
  it('should report as invalid an empty label', () => {
    // given
    const model = new WorkflowGraphModel();

    // when
    const valid = model.isNewLabelValid(null, '');

    // then
    expect(valid).toBe(false);
  });

  it('should report as invalid a label already used', () => {
    // given
    const model = new WorkflowGraphModel();
    model.addNode(mockBlockModel('my_block'));
    const block = mockBlockModel('block');
    model.addNode(block);

    // when
    const valid = model.isNewLabelValid(block, 'my_block');

    // then
    expect(valid).toBe(false);
  });

  const mockBlockModel = (label) => {
    const block = new DefaultBlockNodeModel();
    block.getLabel = () => label;
    return block;
  };

  it('should report as valid a valid label', () => {
    // given
    const model = new WorkflowGraphModel();
    model.addNode(mockBlockModel('my_block'));
    const block = mockBlockModel('block');
    model.addNode(block);

    // when
    const valid = model.isNewLabelValid(block, 'my_block_2');

    // then
    expect(valid).toBe(true);
  });


});
