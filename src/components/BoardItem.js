import html from 'choo/html';
import Nanocomponent from 'nanocomponent';
import materialize from 'materialize-css';
import swal from 'sweetalert2';


class BoardItem extends Nanocomponent {
  constructor(boardId, removeItem, moveItem) {
    super();
    this.boardId = boardId;
    this.removeItem = removeItem;
    this.moveItem = moveItem;
  }
  
  renderItemActions(item) {
    const actions = [
      {
        name: 'Remove',
        code: () => this.removeItem(item),
        icon: 'delete_forever'
      },
      {
        name: 'Move',
        code: () => this.moveItem(this.boardId, item.id),
        icon: 'keyboard_arrow_right'
      }
    ];
    
    return html`
      <div class="card-reveal board-item-reveal">
        <span class="card-title grey-text text-darken-4"><i class="material-icons close">close</i></span>
        <div class="actions">
          ${actions.map(action => html`
            <span class="grey-text center" onclick=${action.code}>
              ${action.name}
              <br />
              <i class="material-icons">${action.icon}</i>
            </span>  
          `)}
        </div>
      </div>
    `;
  }

    
  createElement(item) {
    const { title, description } = item;
    let color = ['green accent-3', 'pink lighten-3', 'light-blue accent-4','yellow darken-2'];
    var itemColor = item.color || color[Math.floor(Math.random() * 4)];
    item.color = itemColor;
    return html`
      <div class="col s12">
        <div class="card ${itemColor}">
          <div class="card-content white-text row">
            <i class="material-icons right activator">more_vert</i>
            <div class="board-item-title">${title}</div>
            <div class="board-item-description">${description}</div>
          </div>
          ${this.renderItemActions(item)}
        </div>
      </div>
    `;
  }

  update() {
    return true;
  }
};

export default BoardItem;