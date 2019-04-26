export const serverBlockTypeDefinitions = [{
  id: 1,
  data: {
    "name": "lambda",
    "ports": [
      {
        "type": "default",
        "name": "In",
        "in": true,
        "label": "In"
      },
      {
        "type": "default",
        "name": "Out",
        "out": true,
        "label": "Out"
      }
    ],
    "displayName": "λ",
    "color": "rgb(0,192,255)",
    "parameterDefinitions": [
      {
        "name": "toCache",
        "displayName": "Cache result",
        "description": "Should the result be cached?",
        "default": true,
        "required": true,
        "type": "boolean"
      },
      {
        "name": "code",
        "displayName": "Code",
        "description": "Code to execute",
        "default": "return input.length;",
        "required": true,
        "type": "code"
      }
    ]
  }
}];

export const serviceBlockTypeDefinitions = [{
  "id": 1,
  "name": "lambda",
  "ports": [
    {
      "type": "default",
      "name": "In",
      "in": true,
      "label": "In"
    },
    {
      "type": "default",
      "name": "Out",
      "out": true,
      "label": "Out"
    }
  ],
  "displayName": "λ",
  "color": "rgb(0,192,255)",
  "parameterDefinitions": [
    {
      "name": "toCache",
      "displayName": "Cache result",
      "description": "Should the result be cached?",
      "default": true,
      "required": true,
      "type": "boolean"
    },
    {
      "name": "code",
      "displayName": "Code",
      "description": "Code to execute",
      "default": "return input.length;",
      "required": true,
      "type": "code"
    }
  ]
}];

