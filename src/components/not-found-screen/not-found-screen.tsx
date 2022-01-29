import { Link } from 'react-router-dom';
import { RoutePaths } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page" >
      <p>Page not found!</p>
      <Link to={RoutePaths.Root}>Back to the main page!</Link>
    </div>
  );
}

export default NotFoundScreen;
