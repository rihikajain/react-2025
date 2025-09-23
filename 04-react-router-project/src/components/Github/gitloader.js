import React from 'react'


const gitloader = async () => {

  const res = await fetch('https://api.github.com/users/rihikajain')
  return res.json()

}
export default gitloader;
