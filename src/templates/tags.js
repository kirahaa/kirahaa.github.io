import React from "react"
import Layout from "../components/layout"
import Bio from "../components/Bio"
import {graphql, Link} from "gatsby"

const Tags = ({pageContext, data, location}) => {
  const {tag} = pageContext
  const {edges, totalCount} = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with #${tag}`

  return (
    <Layout location={location} title={siteTitle}>
      <div className="wrap">
        <Bio showTags={true} />
        <div className="right">
          <h1 className="page-title">{tagHeader}</h1>
          <hr/>
          <ol className="post-list">
            {edges.map(({node}) => {
              const {slug} = node.fields
              const {title, date, description} = node.frontmatter
              return (
                <li key={slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <Link to={slug} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>{date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: description
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark (
      limit: 2000
      sort: { frontmatter: {date: ASC} }
      filter: { frontmatter: {tags: {in: [$tag]}} }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`