import html from 'choo/html';
import Nanocomponent from 'nanocomponent';

class Header extends Nanocomponent {
  createElement() {
    return html`
      <nav class="custom-nav">
        <div class="nav-wrapper amber darken-3">
          <a class="brand-logo center">Kanban</a>
        </div>
      </nav>
    `;
  }

  update() {
    return false;
  }
}

export default Header;