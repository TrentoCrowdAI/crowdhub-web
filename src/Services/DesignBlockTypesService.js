
export default {
  getDesignBlockTypes() {
    return [
      {
        "type": "input_dynamic_text",
        "name": "Input dynamic text",
        "parameterDefinitions": [
          {
            "name": "csvVariable",
            "displayName": "CSV variable",
            "description": "CSV variable that contains the text",
            "default": "text",
            "type": "text",
            "required": true
          },
          {
            "name": "csvTitleVariable",
            "displayName": "CSV title variable",
            "description": "CSV variable that contains the title",
            "default": "title",
            "type": "text",
            "required": true
          },
          {
            "name": "highlightable",
            "displayName": "Highlightable",
            "description": "Allow the performer to highlight text",
            "default": false,
            "type": "boolean",
            "required": true
          },
          {
            "name": "question",
            "displayName": "Highlight question",
            "description": "Question that asks the performer to highlight the text",
            "default": "Select where the title appears",
            "type": "text",
            "required": "highlightable"
          },
          {
            "name": "highlightedCsvVariable",
            "displayName": "Highlighted text CSV variable",
            "description": "Name of the CSV variable where to store the highlighted text",
            "default": "highlighted_text",
            "type": "text",
            "required": "highlightable"
          }
        ]
      },
      {
        "type": "input_dynamic_image",
        "name": "Input dynamic image",
        "parameterDefinitions": [
          {
            "name": "csvVariable",
            "displayName": "CSV variable",
            "description": "CSV variable that contains the image url",
            "default": "image_url",
            "type": "text",
            "required": true
          },
          {
            "name": "highlightable",
            "displayName": "Highlightable",
            "description": "Allow the performer to highlight the image",
            "default": false,
            "type": "boolean",
            "required": true
          },
          {
            "name": "question",
            "displayName": "Highlight question",
            "description": "Question that asks the performer to highlight the image",
            "default": "Highlight people in the image",
            "type": "text",
            "required": "highlightable"
          },
          {
            "name": "highlightedCsvVariable",
            "displayName": "Highlighted text CSV variable",
            "description": "Name of the CSV variable where to store the highlighted coordinates",
            "default": "highlighted_image",
            "type": "text",
            "required": "highlightable"
          }
        ]
      },
      {
        "type": "input_static_text",
        "name": "Input static text",
        "parameterDefinitions": [
          {
            "name": "text",
            "displayName": "Text",
            "description": "Simple static text",
            "default": "",
            "type": "html",
            "required": true
          }
        ]
      },
      {
        "type": "output_open_question",
        "name": "Output open question",
        "parameterDefinitions": [
          {
            "name": "question",
            "displayName": "Question",
            "description": "Question to show to the performer",
            "default": "Describe in few words ...",
            "type": "text",
            "required": true
          },
          {
            "name": "csvVariable",
            "displayName": "CSV Variable",
            "description": "CSV variable where to store the answer of the performer",
            "default": "answer",
            "type": "text",
            "required": true
          },
          {
            "name": "required",
            "displayName": "Required",
            "description": "Is the user required to answer?",
            "type": "boolean",
            "default": true
          },
          {
            "name": "size",
            "displayName": "size",
            "type": "textFromDropdown",
            "default": "slim",
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
        "parameterDefinitions": [
          {
            "name": "question",
            "displayName": "Question",
            "description": "Question to show to the performer",
            "default": "text",
            "type": "text",
            "required": true
          },
          {
            "name": "csvVariable",
            "displayName": "CSV variable",
            "description": "CSV variable where to store the answer",
            "default": "text",
            "type": "text",
            "required": true
          },
          {
            "name": "choices",
            "displayName": "Choices",
            "description": "Available choices",
            "default": [
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
            "default": true
          },
          {
            "name": "choice_type",
            "displayName": "Choice type",
            "type": "textFromDropdown",
            "default": "multiple_checkbox",
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
      }
    ];
  }
}
