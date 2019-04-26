import {serverBlockTypeDefinitions, serviceBlockTypeDefinitions} from '../mock-data/block-types';
import {JSONtoBlockTypeDefinition} from "./BlockTypeDefinitionsService";
import {mockFetchToReturnJson} from "../testHelpers/services";
import BlockTypeDefinitionsService from "./BlockTypeDefinitionsService";


it('maps between server and service representation', () => {
  expect(
    JSONtoBlockTypeDefinition(serverBlockTypeDefinitions[0])
  ).toEqual(serviceBlockTypeDefinitions[0]);
});

describe('test getBlockTypeDefinitions', () => {
  it('sends a GET to /block-types',  async () => {
    mockFetchToReturnJson(serverBlockTypeDefinitions);

    const list = await BlockTypeDefinitionsService.getBlockTypeDefinitions();

    expect(list).toEqual(serviceBlockTypeDefinitions);
  });
});
