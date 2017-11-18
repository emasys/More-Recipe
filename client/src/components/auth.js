const auth = () => {
  const login = localStorage.getItem('token');
  console.log(login);
  console.log('navbar');
  if (login) {
    return (
      <Link className="dropdown-item" onClick={logout} to="/">
        <i className="fa fa-sign-out" aria-hidden="true" />
        {` `}
        Logout
      </Link>
    );
  } else {
    return (
      <h6>
        <Link className="dropdown-item" to="/signin">
          <i className="fa fa-sign-in" aria-hidden="true" />
          {` `}
          Sign in
        </Link>
        <Link className="dropdown-item" to="/signup">
          <i className="fa fa-user-plus" aria-hidden="true" />
          {` `}
          Sign up
        </Link>
      </h6>
    );
  }
};
