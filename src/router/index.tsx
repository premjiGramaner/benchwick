import React, { Fragment, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { withRouter } from './WithRouter'
import AuthWrapper from './AuthWrapper'
import { IS_USER_AUTHENTICATED, updateStorages } from '@Utils/storage'
import { IRouterProps } from '@Utils/interface/PagesInterface'
import { getKey } from '@Utils/utils'
import { CookiesProvider } from 'react-cookie'
import { Cookies } from 'react-cookie'

import AuthMenuList from './authMenuList'
import UnAuthMenuList from './unAuthMenuList'
import HeaderSection from '@Components/HeaderSection/HeaderSection'
import { URLS } from '@Utils/constants'

const RouterComponent: React.FC<IRouterProps> = props => {
  const navigate = useNavigate();
  const cookie = new Cookies()

  useEffect(() => {
    if (cookie.get('isRemember') === true && IS_USER_AUTHENTICATED('cookie') && !IS_USER_AUTHENTICATED()) {
      updateStorages({ moveSessionToLocal: true });
      setTimeout(() => navigate(URLS.DEFAULT), 200)
    }
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
                element={<route.component {...props} />}
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
        <HeaderSection />
        <Routes>
          {AuthMenuList.map(route => {
            return (
              <Route
                path={route.path}
                key={getKey()}
                element={<route.component {...props} />}
              />
            )
          })}
        </Routes>
      </AuthWrapper >
    )
  }

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Suspense
        fallback={
          <Fragment>
            <p>Loading...</p>
          </Fragment>
        }
      >
        {authRoutes}
      </Suspense>
    </CookiesProvider>
  )
}

export default withRouter(RouterComponent)
