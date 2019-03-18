import React, {Component} from 'react';
import Layout from './Components/Layout'
import './App.css';

/* Initialize TinyMCE */
// Import TinyMCE
import tinymce from 'tinymce/tinymce';

// A theme is also required
import 'tinymce/themes/silver/theme';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

// Initialize the app
tinymce.init({
  selector: '#tiny',
  plugins: ['paste', 'link']
});
/* End of TinyMCE initialization */


class App extends Component {
  render() {
    return (<Layout />);
  }
}

export default App;
