import React, {Component} from 'react';
import {Col, Container, Row, InputGroup, FormControl, Button, ProgressBar, Alert} from "react-bootstrap";
import ItemsService from "../../../Services/ItemsService";

export class EmbeddableItemsImporter extends Component {

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

  onImportCompleted = (importedItems) => this.setState({
    importing: false,
    importCompleted: true,
    csvUrl: '',
    importedItemsCount: importedItems.length
  });

  onImportFailed = () => this.setState({
    importing: false,
    importError: true
  });

  render() {
    return (
      <Container>
        <Row>
          <Col><h3>Items</h3></Col>
        </Row>

        {
          /* Error */
          this.state.importError &&
          <Alert variant="danger">
            There's been an error while importing the items.
          </Alert>
        }


        {
          /* Success */
          this.state.importCompleted &&
          <Alert variant="success">
            {this.state.importedItemsCount} items imported successfully!
          </Alert>
        }


        {/* Field for the file URL */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="https://raw.githubusercontent.com/..."
            aria-label="URL of CSV file"
            onChange={this.onInputChange}
            disabled={this.state.importing}
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
          <ProgressBar animated now={100}/>
        }

      </Container>
    );
  }
}
