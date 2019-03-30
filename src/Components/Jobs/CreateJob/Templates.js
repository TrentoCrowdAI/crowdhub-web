const Templates = {

  text_highlighting: {
    name: 'Text Highlighting',
    description: 'Show text to users and ask them questions about it. Users will be able to highlight the text to answer the questions.',
    design: [{
      type: "input_dynamic_text",
      question: "Select which phrase best summarizes the abstract",
      csvVariable: "abstract",
      highlightable: true,
      csvTitleVariable: "yitle",
      highlightedCsvVariable: "highlighted_parts"
    }, {
      type: "output_choices",
      question: "Does the paper describe a study that involves older adults?",
      choices: [{
        label: "Yes",
        value: "Yes"
      }, {
        label: "No",
        value: "No"
      }, {
        label: "Maybe",
        value: "Maybe"
      }],
      required: true,
      choice_type: "single_radio",
      csvVariable: "in_out_radio"
    }, {
      size: "big",
      type: "output_open_question",
      question: "Explain your decision.",
      required: false,
      csvVariable: "decision_explaination"
    }]
  },

  image_classification: {
    name: 'Image Classification',
    description: 'Show images to users and ask them to answer to a multiple choice question.',
    design: [{
      type: "input_dynamic_image",
      csvVariable: "image_url",
      highlightable: false
    }, {
      type: "output_choices",
      choices: [{
        label: "Yes",
        value: "yes"
      }, {
        label: "No",
        value: "no"
      }],
      question: "Does this image contain a cat?",
      required: true,
      choice_type: "single_radio",
      csvVariable: "cat_radio"
    }]
  },

  image_highlighting: {
    name: 'Image Highlighting',
    description: 'Show images to users and ask them to highlight portion of the images to answer a question.',
    design: [{
      type: "input_dynamic_image",
      question: "Select the person in the photo.",
      csvVariable: "image_url",
      highlightable: true,
      highlightedCsvVariable: "annotation"
    }]
  },

  blank: {
    name: 'Blank',
    description: 'Design from scratch the design of your Job to mix different type of questions as you like.',
    design: []
  }

};


// Set all the templates designs valid and expanded
Object.values(Templates).forEach(template => {
  template.design.forEach(block => {
    block.valid = true;
    block.expanded = true;
  });
});


export default Templates;
