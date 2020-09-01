import createStore from '../store/store'
import { Component } from 'react'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const getOrCreateStore = (initialState) => {
  if (isServer) {
    return createStore(initialState)
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default (Comp) => {
  class withReduxApp extends Component {
    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }
    render () {
      const { Component, pageProps, ...rest } = this.props
      // console.log(Component, pageProps)

      if (pageProps) {
        pageProps.test = '123'
      }
  
      return <Comp Component={Component} pageProps={pageProps} reduxStore={this.reduxStore} { ...rest } />
    }
  }

  withReduxApp.getInitialProps = async (ctx) => {
    let reduxStore
    
    if (isServer) {
      const { req } = ctx.ctx
      const session = req.session
  
      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({
          user: session.userInfo
        })
      } else {
        reduxStore = getOrCreateStore()
      }
    } else {
      reduxStore = getOrCreateStore()
    }

    ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }
    
    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }

  return withReduxApp
}