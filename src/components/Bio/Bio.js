/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Icon from "../Icon"
import {getContactHref, getIcon} from "../../utils"
import * as styles from './Bio.module.scss'
import Tags from "../Post/Tags"

const Bio = ({showTags}) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            email
            github
            linkedIn
          }
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
          tags
        }
      }
      group(field: {frontmatter: {tags: SELECT}}) {
        edges {
          node {
          id
          }
        }
        fieldValue
        totalCount
      }
    }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
    const {group: tags} = data.allMarkdownRemark

  return (
    <div className="bio">
      <Link to="/">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../../images/profile.png"
          width={75}
          height={75}
          quality={95}
          alt="Profile picture"
        />
      </Link>
      {author?.name && (
        <>
          <h1>
            <Link to="/"><strong>{author.name}</strong></Link>
          </h1>
          <p>{author?.summary || null}</p>
          <Link to="/portfolio" className={styles.link}>Portfolio</Link>
          <ul className={styles['contacts__list']}>
            {Object.keys(social).map((name) => (!social[name] ? null : (
              <li key={name} className={styles['contacts__listItem']}>
                <a
                  className={styles['contacts__listLink']}
                  href={getContactHref(name, social[name])}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon name={name} icon={getIcon(name)}/>
                </a>
              </li>
              )
            ))}
          </ul>
          {showTags && <Tags tags={tags.map((tag) => tag.fieldValue)}/>}
        </>
      )}
    </div>
  )
}

export default Bio
