import React, {Component} from 'react';
import {Alert, Button, Col, Container, FormControl, InputGroup, ProgressBar, Row} from "react-bootstrap";
import ItemsService from "../../../Services/rest/ItemsService";

export class ItemsImporter extends Component {

  state = {
    csvUrl: '',
  };

  onInputChange = (event) => this.setState({csvUrl: event.target.value});

  onImport = async () => {
    this.onStartImport();

    try {
      const items = await ItemsService.importFromCsvUrl(this.props.project, this.state.csvUrl);
      this.onImportCompleted(items);
    } catch (e) {
      this.onImportFailed();
    }
  };

  onStartImport = () => this.setState({
    importing: true,
    importCompleted: false,
    importError: false
  });

  onImportCompleted = (importedItems) => {
    this.setState({
      importing: false,
      importCompleted: true,
      csvUrl: '',
      importedItemsCount: importedItems.length
    });
    this.props.onItemsImported();
  };

  onImportFailed = () => this.setState({
    importing: false,
    importError: true
  });

  render() {
    return (
      <Container>
        <Row className="header-row">
          <Col><h3>Import new items</h3></Col>
        </Row>

        {
          /* Error */
          this.state.importError &&
          <ImportItemsError/>
        }


        {
          /* Success */
          this.state.importCompleted &&
          <ImportItemsSuccess count={this.state.importedItemsCount}/>
        }


        {/* Field for the file URL */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="https://raw.githubusercontent.com/..."
            aria-label="URL of CSV file"
            onChange={this.onInputChange}
            disabled={this.state.importing}
            name="csvUrl"
          />

          <InputGroup.Append>
            <Button
              variant="outline-primary"
              value={this.state.csvUrl}
              disabled={this.state.csvUrl.length <= 0 || this.state.importing}
              onClick={this.onImport}>
              Import
            </Button>
          </InputGroup.Append>
        </InputGroup>

        {
          /* Importing */
          this.state.importing &&
          <ImportingItems/>
        }

      </Container>
    );
  }
}


export const ImportItemsError = () => (
  <Alert variant="danger">
    There's been an error while importing the items.
  </Alert>
);

export const ImportItemsSuccess = ({count}) => (
  <Alert variant="success">
    {count} items imported successfully!
  </Alert>
);

export const ImportingItems = () => (
  <ProgressBar animated now={100}/>
);
