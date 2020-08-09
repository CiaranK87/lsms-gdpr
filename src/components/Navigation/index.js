import React from 'react';


import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import './nav.css';
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SchoolIcon from '@material-ui/icons/School';
import CommuteIcon from '@material-ui/icons/Commute';
import HotelIcon from '@material-ui/icons/Hotel';
import GroupIcon from '@material-ui/icons/Group';
import NavigationRow from './NavigationRow';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <div className="nav__main">
  <NavigationRow Icon={HomeIcon} route={ROUTES.HOME} title="Home"></NavigationRow>
  <NavigationRow Icon={LocalLibraryIcon} route={ROUTES.STUDENTS} title="Students"></NavigationRow>
  <NavigationRow Icon={SchoolIcon} route={ROUTES.TEACHERS} title="Teachers"></NavigationRow>
  <NavigationRow Icon={CommuteIcon} route={ROUTES.TRANSPORTERS} title="Transport"></NavigationRow>
  <NavigationRow Icon={HotelIcon} route={ROUTES.HOSTS} title="Hosts"></NavigationRow>
  <NavigationRow Icon={GroupIcon} route={ROUTES.COURSES} title="Courses"></NavigationRow>
  
    {/* <li>
      
    </li>
  </ul> */}

  </div>
);

const NavigationNonAuth = () => (
  <>
  </>
);



export default Navigation;