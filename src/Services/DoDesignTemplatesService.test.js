import {serverDoDesignTemplates, serviceDoDesignTemplates} from '../mock-data/template-do';
import {mockFetchToReturnJson} from "../testHelpers/services";
import DoDesignTemplatesService, {JSONtoDoDesignTemplate} from "./DoDesignTemplatesService";


it('maps between server and service representation', () => {
  expect(
    JSONtoDoDesignTemplate(serverDoDesignTemplates[0])
  ).toEqual(serviceDoDesignTemplates[0]);
});

describe('test getBlockTypeDefinitions', () => {
  it('sends a GET to /template-do',  async () => {
    mockFetchToReturnJson(serverDoDesignTemplates);

    const list = await DoDesignTemplatesService.getDoDesignTemplates();

    expect(list).toEqual(serviceDoDesignTemplates);
  });
});
