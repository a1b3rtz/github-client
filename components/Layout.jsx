import Link from 'next/link'
import { Button } from 'antd'

export default ({ children }) => (
  <>
    <header>
      <Link href='/a?id=123'>
        <Button>Index</Button>
      </Link>
      <Link href='/test/b'>
        <Button>Index</Button>
      </Link>
      <a>this is a a tag</a>
    </header>
    <div>
      {children}
    </div>
  </>
)