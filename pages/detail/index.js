/**
 * TODO if there is no README
 */
import dynamic from 'next/dynamic'
import withRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'

const MDRenderer = dynamic(() => import('../../components/MarkdownRender'),
  {
    loading: () => <p>Loading</p>
  }
)

const Detail = ({ readme }) => {
  return (
    <MDRenderer content={readme.content} isBase64={true} />
  )
}

Detail.getInitialProps = async ({ ctx: { query: { owner, name }, req, res}}) => {

  const readmeResp = await api.request({
    url: `/repos/${owner}/${name}/readme`
  }, req, res)

  return {
    readme: readmeResp.data
  }
}

export default withRepoBasic(Detail, 'index')
