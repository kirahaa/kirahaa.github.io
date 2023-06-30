/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Icon from "../Icon"
import {getContactHref, getIcon} from "../../utils"
import * as styles from './Bio.module.scss'

const Bio = () => {
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
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
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
      {author?.name && (
        <>
          <h1>
            <strong>{author.name}</strong>
          </h1>
          <p>{author?.summary || null}</p>
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
        </>
      )}
    </div>
  )
}

export default Bio
