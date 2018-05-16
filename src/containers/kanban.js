import html from 'choo/html';

/* UI Components */
import Header from '../components/Header';
import Footer from '../components/Footer';
import Board from '../components/Board';
import swal from 'sweetalert2';

/* UI Instances (This is kinda weird but I'm just following documentation */
const header = new Header();
const footer = new Footer();

const kanban = (state, emit) => {
  const grids = [{
      id: 1,
      title: 'Todo'
    },{
      id: 2,
      title: 'Doing'
    },{
      id: 3,
      title: 'Done'
    }
  ]
  const renderBoards = () => {
    state.boards = grids;
    const { boards, boardItems } = state;
    return boards.map(board => {
      var todoAction = board.title === 'Todo' ?  addNewItem : function(){};
      const currBoard = new Board(board.id, todoAction, removeItem, moveItem);
      const currBoardItems = boardItems.filter(boardItem => boardItem.boardId === board.id);
      return currBoard.render(board.title, currBoardItems);
    });
  }

  const addNewItem = async (boardId) => {
    const { value } = await swal({
      title: 'New task',
      html: `
        <input id="item-title" class="swal2-input" placeholder="Title">
        <input id="item-description" class="swal2-input" placeholder="description (optional)">`,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById('item-title').value;
        const description = document.getElementById('item-description').value;
        return { title, description };
      }
    });
    
    if (value.title) {
      emit('boardItem:add', value, boardId);
    } else {
      swal(
        'Ops...',
        'You must fill the title to create an item :)',
        'warning'
      );
    }
  }

  const moveItem = async (boardId, itemId) => {
    const inputOptions = {};
    state.boards.forEach(board => {
      if (board.id !== boardId) {
        inputOptions[board.id] = board.title;
      }
    });
    if (Object.values(inputOptions).length) {
      const { value } = await swal({
        title: 'Move board item',
        input: 'select',
        inputOptions,
        inputPlaceholder: 'Select a board destination',
        showCancelButton: true,
        preConfirm: boardId => Promise.resolve(parseInt(boardId))
      });
  
      if (value) {
        emit('boardItem:move', itemId, value);
      }
    } else {
      swal(
        'Ops...',
        'Seems like you have no boards to move yet. Add more boards on \'New board\' button :)',
        'warning'
      );
    }
  }

  const removeItem = (item) => {
    emit('boardItem:remove', item.id);
    swal(
      'Done!',
      `${item.title} was sucessfully removed.`,
      'success'
    );
  }
  
  return html`
    <div class="kanban-container">
    <!-- Material Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      ${header.render()}
      <div class="content">
        ${renderBoards()}
      </div>
    </div>
  `;
};


export default kanban;