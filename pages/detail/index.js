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
  if (readme !== 'no data') {
    return (
      <MDRenderer content={readme.content} isBase64={true} />
    )
  } else {
    return (
      <div>
        <span>No readme file found.</span>
      </div>
    )
  }
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
