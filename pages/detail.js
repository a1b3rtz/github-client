const Detail = () => {
  return <span>Detail</span>
}

Detail.getInitialProps = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, 1000);
  })
}

export default Detail