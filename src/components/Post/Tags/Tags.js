import React from "react"
import {Link} from "gatsby"
import * as styles from './Tags.module.scss'

const Tags = ({tags}) => (
    <div className={styles['tags']}>
        <ul className={styles['tags__list']}>
            {tags && tags.map(tag => (
                <li className={styles['tags__listItem']}>
                    <Link className={styles['tags__listLink']} to={`/tags/${tag}`}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

export default Tags