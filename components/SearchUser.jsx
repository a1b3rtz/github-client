import { Select, Spin } from 'antd'
import { useState, useCallback, useRef } from 'react'
import debounce from 'lodash/debounce'

import api from '../lib/api'

const Option = Select.Option

const SearchUser = ({ onChange, value }) => {
  // { current: 0 }
  const lastFetchIdRef = useRef(0)
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])

  const fetchUser = useCallback(debounce(value => {

    lastFetchIdRef.current += 1
    const fetchId = lastFetchIdRef.current
    setFetching(true)
    setOptions([])

    api
      .request({
        url: `/search/users?q=${value}`
      })
      .then(res => {
        if (fetchId !== lastFetchIdRef.current) {
          return
        }
        const data = res.data.items.map(user => ({
          text: user.login,
          value: user.login
        }))
        setFetching(false)
        setOptions(data)
      })
  }, 500), [])

  const handleChange = (value) => {
    setOptions([])
    setFetching(false)
    onChange(value)
  }

  return (
    <Select
      showSearch={true}
      notFoundContent={fetching ? <Spin size="small" /> : <span>not found</span>}
      filterOption={false}
      placeholder="Creator"
      allowClear={true}
      onSearch={fetchUser}
      style={{ width: 200 }}
      onChange={handleChange}
      value={value}
    >
      {options.map(option => (
        <Option value={option.value} key={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  )
}

export default SearchUser