import React from 'react'

const aa = (function () {
  let res,
    s = 'pending'
  const p = new Promise((r) => {
    setTimeout(() => {
      r({ aaa: 111 })
    }, 5000)
  })
  p.then(
    ({ aaa }) => {
      res = aaa
      s = 'success'
      console.log(res, s)
    },
    () => (s = 'error')
  )
  return function () {
    if (s === 'pending') {
      throw p
    }
    return res
  }
})()

export default function About() {
  console.log('about 探测')
  const v = aa()
  return <div>{v}</div>
}
