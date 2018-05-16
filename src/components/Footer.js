import html from 'choo/html';
import Nanocomponent from 'nanocomponent';

class Footer extends Nanocomponent {
  createElement() {
    return html`
      <footer class="page-footer amber darken-3">
        <div class="container center">
         <h8> 2018 MIT - This project is licensed under the terms of the MIT license. </h8>
        </div>
       </footer>
    `;
  }

  update() {
    return false;
  }
}

export default Footer;