import { Link } from 'react-router-dom';
import { LinkRoutes } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page" >
      <p>Page not found!</p>
      <Link to={LinkRoutes.Root}>Back to the main page!</Link>
    </div>
  );
}

export default NotFoundScreen;
