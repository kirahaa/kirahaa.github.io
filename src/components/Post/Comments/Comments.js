import React from 'react'
import {Disqus, CommentCount} from 'gatsby-plugin-disqus'

const Comments = (id) => {
  let disqusConfig = {
    identifier: id,
  }
  return (
    <>
      <CommentCount config={disqusConfig}/>
      <Disqus config={disqusConfig}/>
    </>
  )
}

export default Comments