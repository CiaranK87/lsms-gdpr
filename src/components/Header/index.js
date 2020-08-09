import React from 'react';
import './Header.css';
import logo from './logo.png';
import HomeIcon  from '@material-ui/icons/Home';
import PersonIcon  from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import NavigationRow from '../Navigation/NavigationRow';
import { AuthUserContext } from '../Session';

function Header() {

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className="header">
          <div className="header__left">
              <img src={logo} alt="Logo" />
          </div>
          {!!authUser && (
            <div className="header__icons">
              {!!authUser && !!authUser.roles[ROLES.ADMIN] && (
                <NavigationRow
                  Icon={SupervisorAccountIcon}
                  route={ROUTES.ADMIN}
                  title="Admin"
                ></NavigationRow>
               )}
               <span>{authUser.email}</span>
              <NavigationRow Icon={PersonIcon} route={ROUTES.ACCOUNT} title="Account"></NavigationRow>
              <SignOutButton />
            </div>
          )}
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

export default Header;
