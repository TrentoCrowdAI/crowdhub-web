import {DefaultBlockNodeModel} from "./DefaultBlockNodeModel";
import BlockPortModel from "./BlockPortModel";
import {DefaultLinkModel} from "storm-react-diagrams";

describe('test blockDependsOnItself', () => {
  test("two blocks connected to each other", () => {
    // given
    const blocks = {
      a: new DefaultBlockNodeModel(),
      b: new DefaultBlockNodeModel()
    };
    const portsOfBlock = {
      a: {
        in: new BlockPortModel(true, 'in'),
        out: new BlockPortModel(false, 'out')
      },
      b: {
        in: new BlockPortModel(true, 'in'),
        out: new BlockPortModel(false, 'out')
      }
    };
    blocks.a.addPort(portsOfBlock.a.in);
    blocks.a.addPort(portsOfBlock.a.out);
    blocks.b.addPort(portsOfBlock.b.in);
    blocks.b.addPort(portsOfBlock.b.out);

    const aOut_to_bIn = new DefaultLinkModel();
    portsOfBlock.a.out.addLink(aOut_to_bIn);
    portsOfBlock.b.in.addLink(aOut_to_bIn);
    aOut_to_bIn.sourcePort = portsOfBlock.a.out;
    aOut_to_bIn.targetPort = portsOfBlock.b.in;

    const bOut_to_aIn = new DefaultLinkModel();
    portsOfBlock.b.out.addLink(bOut_to_aIn);
    portsOfBlock.a.in.addLink(bOut_to_aIn);
    bOut_to_aIn.sourcePort = portsOfBlock.b.out;
    bOut_to_aIn.targetPort = portsOfBlock.a.in;

    // when
    const aDependsOnItself = BlockPortModel.blockDependsOnItself(blocks.a);
    const bDependsOnItself = BlockPortModel.blockDependsOnItself(blocks.b);

    // then
    expect(aDependsOnItself).toBe(true);
    expect(bDependsOnItself).toBe(true);
  });

  test("parallel blocks don't depend on each other", () => {
    // given
    const blocks = {
      a: new DefaultBlockNodeModel(),
      b1: new DefaultBlockNodeModel(),
      b2: new DefaultBlockNodeModel(),
      c: new DefaultBlockNodeModel()
    };
    const portsOfBlock = {
      a: {
        out: new BlockPortModel(false, 'out')
      },
      b1: {
        in: new BlockPortModel(true, 'in'),
        out: new BlockPortModel(false, 'out')
      },
      b2: {
        in: new BlockPortModel(true, 'in'),
        out: new BlockPortModel(false, 'out')
      },
      c: {
        in: new BlockPortModel(true, 'in'),
        out: new BlockPortModel(false, 'out') // not used but needed by blockDependsOnItself
      }
    };
    blocks.a.addPort(portsOfBlock.a.out);
    blocks.b1.addPort(portsOfBlock.b1.in);
    blocks.b1.addPort(portsOfBlock.b1.out);
    blocks.b2.addPort(portsOfBlock.b2.in);
    blocks.b2.addPort(portsOfBlock.b2.out);
    blocks.c.addPort(portsOfBlock.c.in);
    blocks.c.addPort(portsOfBlock.c.out);

    const aOut_to_b1In = new DefaultLinkModel();
    portsOfBlock.a.out.addLink(aOut_to_b1In);
    portsOfBlock.b1.in.addLink(aOut_to_b1In);
    aOut_to_b1In.sourcePort = portsOfBlock.a.out;
    aOut_to_b1In.targetPort = portsOfBlock.b1.in;

    const aOut_to_b2In = new DefaultLinkModel();
    portsOfBlock.a.out.addLink(aOut_to_b2In);
    portsOfBlock.b2.in.addLink(aOut_to_b2In);
    aOut_to_b2In.sourcePort = portsOfBlock.a.out;
    aOut_to_b2In.targetPort = portsOfBlock.b2.in;

    const b1Out_to_cIn = new DefaultBlockNodeModel();
    portsOfBlock.b1.out.addLink(b1Out_to_cIn);
    portsOfBlock.c.in.addLink(b1Out_to_cIn);
    b1Out_to_cIn.sourcePort = portsOfBlock.b1.out;
    b1Out_to_cIn.targetPort = portsOfBlock.c.in;

    const b2Out_to_cIn = new DefaultBlockNodeModel();
    portsOfBlock.b2.out.addLink(b2Out_to_cIn);
    portsOfBlock.c.in.addLink(b2Out_to_cIn);
    b2Out_to_cIn.sourcePort = portsOfBlock.b2.out;
    b2Out_to_cIn.targetPort = portsOfBlock.c.in;


    // when
    const aDependsOnItself = BlockPortModel.blockDependsOnItself(blocks.a);
    const b1DependsOnItself = BlockPortModel.blockDependsOnItself(blocks.b1);
    const b2DependsOnItself = BlockPortModel.blockDependsOnItself(blocks.b2);
    const cDependsOnItself = BlockPortModel.blockDependsOnItself(blocks.c);

    // then
    expect(aDependsOnItself).toBe(false);
    expect(b1DependsOnItself).toBe(false);
    expect(b2DependsOnItself).toBe(false);
    expect(cDependsOnItself).toBe(false);
  });
});
