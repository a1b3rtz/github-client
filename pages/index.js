import { request } from '../lib/api'

const Index = () => {

  return (
    <span>index</span>
  )
}

Index.getInitialProps = async ({ ctx }) => {
  const result = await request(
    { 
      url: '/search/repositories?q=react' 
    }, 
    ctx.req,
    ctx.res
  )

  return {
    data: result.data
  }
}

export default Index