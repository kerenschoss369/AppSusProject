const { NavLink } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function Navbar() {
  return (
    <header className="main-header flex align-center space-between">
      <Link to={`/`}>
        <h1 className="logo main-title">Appsus</h1>
      </Link>
      <ul className="main-nav flex">
        <li><NavLink to="/book">Books</NavLink></li>
        <li><NavLink exact to="/note">Notes</NavLink></li>
        <li><NavLink exact to="/emails/inbox">Email</NavLink></li>
      </ul>
    </header>
  );
}
