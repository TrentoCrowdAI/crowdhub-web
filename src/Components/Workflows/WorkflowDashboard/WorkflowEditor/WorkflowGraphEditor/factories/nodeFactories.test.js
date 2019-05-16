import nodeFactories from "./nodeFactories";
import {DoBlockNodeFactory} from "./DoBlockNodeFactory";
import {DefaultBlockNodeFactory} from "./DefaultBlockNodeFactory";

describe('test the selection of the right factory', () => {

  it("should return the DoBlockNodeFactory for 'do' blocks", () => {
    // when
    const Factory = nodeFactories.getNodeFactoryForBlockType('do');

    // then
    expect(Factory).toBe(DoBlockNodeFactory);
  });

  it("should return the DefaultBlockNodeFactory for 'lambda' blocks", () => {
    // when
    const Factory = nodeFactories.getNodeFactoryForBlockType('lambda');

    // then
    expect(Factory).toBe(DefaultBlockNodeFactory);
  });

  it("should return the DefaultBlockNodeFactory for an unknown block type", () => {
    // when
    const Factory = nodeFactories.getNodeFactoryForBlockType('a');

    // then
    expect(Factory).toBe(DefaultBlockNodeFactory);
  });

});
