import html from 'choo/html';
import Nanocomponent from 'nanocomponent';

/* UI Components */
import BoardItem from '../components/BoardItem';

/* UI Instances */
const boardItem = new BoardItem();

class Board extends Nanocomponent {
  constructor(id, addNewItem, removeItem, moveItem) {
    super();    
    this.id = id;
    this.addNewItem = addNewItem;
    this.removeItem = removeItem;
    this.moveItem = moveItem;
  }
  renderItems(items) {    
    return items.map(item => {
      return new BoardItem(this.id, this.removeItem, this.moveItem).render(item);
    });
  }

  addNewTaskButton() {
    return this.id === 1 ?
            html`<div class="container">
                  <a class="waves-effect waves-light btn btn-block amber darken-1" onclick=${() => this.addNewItem(this.id)}>
                    <i class="material-icons left ">add</i>
                    New task
                  </a>
                </div>` :
            html``;

  }

  createElement(title, items) {
    return html`
      <div class="board">
        <div class="card amber accent-1">
          <div class="card-content black-text">
            <span class="card-title center"><b>${title}</b></span>
            <hr />
            <div class="row">
              ${this.renderItems(items)}
            </div>
            ${this.addNewTaskButton()}
          </div>
        </div>
      </div>
    `;
  }

  update() {
    return true;
  }
}

export default Board;