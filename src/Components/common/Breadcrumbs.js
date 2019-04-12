import React from 'react';
import {Link} from "react-router-dom";

export const LinkBreadcrumb = ({to, children}) => (
  <li className="breadcrumb-item">
    <Link to={to}>{children}</Link>
  </li>
);

export const SimpleBreadcrumb = ({children}) => (<li className="breadcrumb-item">{ children }</li>);
