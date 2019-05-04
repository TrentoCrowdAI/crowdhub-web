import {APP_URL} from "../../config";
import {mockFetchToReturnJson} from "../../testHelpers/services";
import ItemsService from "./ItemsService";
import mockedItems from '../../mock-data/items';
import mockedProjects from '../../mock-data/projects';

const project = mockedProjects[0];

describe('import items from CSV file', () => {
  it('should send a POST to /items', async () => {
    mockFetchToReturnJson(mockedItems);
    const json = {
      id_project: project.id,
      csv_url: 'https://https://raw.githubusercontent.com/TrentoCrowdAI/servant-api/develop/src/example/image-classification.csv'
    };

    await ItemsService.importFromCsvUrl(project, json.csv_url);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });
  });
});
