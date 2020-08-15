import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => 
        TokenService.hasAuthToken()
        // <Component {...componentProps} key={Object.values(componentProps.match.params)[0]}/>
        ? <Component {...componentProps}/>
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: componentProps.location }
            }}
          />
      }
    />
  )
}
