import * as React from "react"
import Layout from "../components/layout"
import {graphql} from "gatsby"
import * as styles from '../assets/scss/pages/Porfolio.module.scss'

const Portfolio = ({ data, location }) => {


  return (
    <>
      hello~
    </>
  )
}
export default Portfolio

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
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
`