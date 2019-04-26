export const serverDoDesignTemplates = [{
  "id": 1,
  "data": {
    "name": "Text highlight",
    "description": "Some description",
    "blocks": [{
      "type": "input_dynamic_text",
      "parameters": {
        "csvVariable": "text",
        "csvTitleVariable": "title",
        "highlightable": false,
        "question": "Select which phrase best summarizes the abstract",
        "highlightedCsvVariable": "highlighted_text"
      }
    }]
  }
}];

export const serviceDoDesignTemplates = [{
  "id": 1,
  "name": "Text highlight",
  "description": "Some description",
  "blocks": [{
    "type": "input_dynamic_text",
    "parameters": {
      "csvVariable": "text",
      "csvTitleVariable": "title",
      "highlightable": false,
      "question": "Select which phrase best summarizes the abstract",
      "highlightedCsvVariable": "highlighted_text"
    }
  }]
}];
