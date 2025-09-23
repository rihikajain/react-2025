import React from 'react'
import { useLoaderData } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import gitloader from './gitloader'


function Github() {
  const data = useLoaderData()

  // const [data, setData] = useState({})
  // useEffect(() => {
  //   fetch('https://api.github.com/users/rihikajain')
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  // }, [])
  return (
    <>
      <div>Github followers:{data.Followers}</div>
      <div><img src={data.avatar_url} alt="gitimage" width={200} /></div>
    </>

  )
}
export default Github
