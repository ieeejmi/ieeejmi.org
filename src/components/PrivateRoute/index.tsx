import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { Context } from '../../ContextProvider'

export const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const context = useContext(Context)

  return (
    <Route {...rest} 
      render={(routeprops) => (
        context.state.isAuth ? (
          Component ? <Component {...routeprops} /> : null
        ) : (
          <Redirect to={`/login?r=${routeprops.location.pathname}`} />
        )
      )}
    />
  )
}