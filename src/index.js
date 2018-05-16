import choo from 'choo';

/* Styles */
import 'materialize-css/dist/css/materialize.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './style/style.css';

/* Views */
import home from './containers/home';
import notFound from './containers/notFound';

/* Stores */
import persistence from './events/persistence';
import boards from './events/boards';
import boardItems from './events/boardItems';

/* App */
const app = choo();

app.use(persistence);
app.use(boards);
app.use(boardItems);

/* Routes */
app.route('/', home);
app.route('/*', notFound);

app.mount(document.getElementById('App'))

