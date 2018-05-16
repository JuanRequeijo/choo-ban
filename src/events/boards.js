import storage from '../util/storage';

const boards = (state, emitter) => {
  state.boards = storage.get('boards');
}

export default boards;