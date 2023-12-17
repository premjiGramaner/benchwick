import React, { Fragment, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { URLS } from '@Utils/constants'
import { withRouter } from './WithRouter'
import AuthWrapper from './AuthWrapper'
import { IS_USER_AUTHENTICATED } from '@Utils/storage'
import { IRouterProps } from '@Utils/interface/PagesInterface'
import { getKey } from '@Utils/utils'
// import { CookiesProvider } from 'react-cookie'
// import { Cookies } from 'react-cookie'

import AuthMenuList from './authMenuList'
import UnAuthMenuList from './unAuthMenuList'

const RouterComponent: React.FC<IRouterProps> = props => {
  // const cookies = new Cookies()
  const navigate = useNavigate()
  // let isRemember = cookies.get('isRemember')
  useEffect(() => {
    // if (isRemember === 'true') return
    // navigate(URLS.DEFAULT)
    // console.log('RouterComponent Initial props', UnAuthMenuList)
  }, [])

  let authRoutes = null
  if (!IS_USER_AUTHENTICATED()) {
    authRoutes = (
      <AuthWrapper {...props}>
        <Routes>
          {UnAuthMenuList.map(route => {
            return (
              <Route
                path={route.path}
                key={getKey()}
                element={<route.component {...props} routeInfo={route} />}
              />
            )
          })}
        </Routes>
      </AuthWrapper>
    )
  }

  if (IS_USER_AUTHENTICATED()) {
    authRoutes = (
      <AuthWrapper {...props}>
        <Routes>
          {AuthMenuList.map(route => {
            return (
              <Route
                path={route.path}
                key={getKey()}
                element={<route.component {...props} routeInfo={route} />}
              />
            )
          })}
        </Routes>
      </AuthWrapper>
    )
  }

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <Fragment>
            <p>Loading...</p>
          </Fragment>
        }
      >
        {authRoutes}
      </Suspense>
    </React.Fragment>
  )
}

export default withRouter(RouterComponent)
