import React from 'react';
import { Link } from 'react-router-dom';

function NavigationRow({ selected, Icon, title, route }) {
  return (
    <Link style={{ textDecoration: 'none' }} to={route}>
      <div className={`navRow ${selected && 'selected'}`}>
        <Icon className="navRow__icon" />
        {title}
      </div>
    </Link>
  );
}

export default NavigationRow;
