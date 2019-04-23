
export default {
  getDesignBlockTypes() {
    return [
      {
        "type": "input_dynamic_text",
        "name": "Input dynamic text",
        "parameters": [
          {
            "name": "csvVariable",
            "displayName": "CSV variable",
            "description": "CSV variable that contains the text",
            "value": "text",
            "type": "text",
            "required": true
          },
          {
            "name": "csvTitleVariable",
            "displayName": "CSV title variable",
            "description": "CSV variable that contains the title",
            "value": "title",
            "type": "text",
            "required": true
          },
          {
            "name": "highlightable",
            "displayName": "Highlightable",
            "description": "Allow the performer to highlight text",
            "value": false,
            "type": "boolean",
            "required": true
          },
          {
            "name": "question",
            "displayName": "Highlight question",
            "description": "Question that asks the performer to highlight the text",
            "value": "Select where the title appears",
            "type": "text",
            "required": "highlightable"
          },
          {
            "name": "highlightedCsvVariable",
            "displayName": "Highlighted text CSV variable",
            "description": "Name of the CSV variable where to store the highlighted text",
            "value": "highlighted_text",
            "type": "text",
            "required": "highlightable"
          }
        ]
      },
      {
        "type": "input_dynamic_image",
        "name": "Input dynamic image",
        "parameters": [
          {
            "name": "csvVariable",
            "displayName": "CSV variable",
            "description": "CSV variable that contains the image url",
            "value": "image_url",
            "type": "text",
            "required": true
          },
          {
            "name": "highlightable",
            "displayName": "Highlightable",
            "description": "Allow the performer to highlight the image",
            "value": false,
            "type": "boolean",
            "required": true
          },
          {
            "name": "question",
            "displayName": "Highlight question",
            "description": "Question that asks the performer to highlight the image",
            "value": "Highlight people in the image",
            "type": "text",
            "required": "highlightable"
          },
          {
            "name": "highlightedCsvVariable",
            "displayName": "Highlighted text CSV variable",
            "description": "Name of the CSV variable where to store the highlighted coordinates",
            "value": "highlighted_image",
            "type": "text",
            "required": "highlightable"
          }
        ]
      },
      {
        "type": "input_static_text",
        "name": "Input static text",
        "parameters": [
          {
            "name": "text",
            "displayName": "Text",
            "description": "Simple static text",
            "value": "",
            "type": "html",
            "required": true
          }
        ]
      },
      {
        "type": "output_open_question",
        "name": "Output open question",
        "parameters": [
          {
            "name": "question",
            "displayName": "Question",
            "description": "Question to show to the performer",
            "value": "Describe in few words ...",
            "type": "text",
            "required": true
          },
          {
            "name": "csvVariable",
            "displayName": "CSV Variable",
            "description": "CSV variable where to store the answer of the performer",
            "value": "answer",
            "type": "text",
            "required": true
          },
          {
            "name": "required",
            "displayName": "Required",
            "description": "Is the user required to answer?",
            "type": "boolean",
            "value": true
          },
          {
            "name": "size",
            "displayName": "size",
            "type": "textFromDropdown",
            "value": "slim",
            "choices": [
              {
                "value": "slim",
                "label": "Slim"
              },
              {
                "value": "big",
                "label": "Big"
              }
            ]
          }
        ]
      },
      {
        "type": "output_choices",
        "name": "Output choices",
        "parameters": [
          {
            "name": "question",
            "displayName": "Question",
            "description": "Question to show to the performer",
            "value": "text",
            "type": "text",
            "required": true
          },
          {
            "name": "choices",
            "displayName": "Choices",
            "description": "Available choices",
            "value": [
              {
                "value": "yes",
                "label": "Yes"
              },
              {
                "value": "no",
                "label": "No"
              }
            ],
            "type": "choiceBuilder",
            "required": true
          },
          {
            "name": "required",
            "displayName": "Required",
            "description": "Is the user required to answer?",
            "type": "boolean",
            "value": true
          },
          {
            "name": "choice_type",
            "displayName": "Choice type",
            "type": "textFromDropdown",
            "value": "multiple_checkbox",
            "choices": [
              {
                "value": "multiple_checkbox",
                "label": "Multiple choice"
              },
              {
                "value": "single_radio",
                "label": "Single choice radio"
              },
              {
                "value": "Single choice dropdown",
                "label": "single_dropdown"
              }
            ]
          }
        ]
      },
    ];
  }
}
