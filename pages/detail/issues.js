import withRepoBasic from '../../components/with-repo-basic'

const Issues = ({text}) => {
  return <span> Issues Index {text} </span>
}

Issues.getInitialProps = async () => {
  return {
    text: 123
  }
}

export default withRepoBasic(Issues, 'issues')

