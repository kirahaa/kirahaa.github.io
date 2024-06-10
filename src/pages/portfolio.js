import * as React from "react"
import {graphql} from "gatsby"
import * as styles from '../assets/scss/pages/Porfolio.module.scss'

const Portfolio = ({ data, location }) => {
  const workExperience = [
    {
      name: "스틱인터랙티브",
      role: "Frontend Developer",
      period: "2021.10 - 2024.05",
      projects: [
        {
          name: "밀키스 프로모션 이벤트",
          period: "2024.04 ~ 2024.05",
          description: "롯데칠성음료 밀키스 프로모션 이벤트 페이지 프론트엔드를 설계하고 제작했습니다.",
          whatIDid: [
            "프론트엔드 기술환경 구성 및 기본 기능 구현",
            "React기반 컴포넌트 계층 구조 디자인",
            "Redux 기반 스토어 디자인",
            "HTTP 메소드 기반 API 통신",
            "모바일 중심 프로젝트로 모바일 우선 반응형 작업"
          ],
          techStack: "React, Redux, SCSS, Git"
        },
        {
          name: "사내 인트라넷 구축",
          period: "2022.10 ~ 2024.04",
          description: "사내 인트라넷 서비스인 Stick Works의 프론트엔드를 개발했습니다. 기본적인 유지보수를 비롯해 비즈니스의 요구에 맞는 다양한 새로운 기능을 개발했습니다.",
          whatIDid: [
            "React 기반 컴포넌트 계층 구조 디자인",
            "reactstrap, scss 기반 반응형 작업",
            "recoil, redux 기반 상태 관리"
          ],
          techStack: "React, Redux, Recoil, Reactstrap, SCSS"
        },
        {
          name: "한우자조금 사이트 리뉴얼",
          period: "2023.08 ~ 2023.10",
          description: "한우자조금 홈페이지의 리뉴얼 구축 작업에서 UI를 개발했습니다.",
          whatIDid: [
            "적응형 페이지로 Scss 기반 퍼블리싱",
            "chart.js 이용한 데이터 시각화",
            "웹 표준 고려하여 시멘틱 요소로 화면을 구성",
            "검색 엔진 최적화와 웹 접근성 준수",
            "webpack 마이그레이션"
          ],
          techStack: "Jquery, SCSS, Gulp, Webpack, PHP"
        },
      ]
    }
  ]

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <header>
            <h1>Hayeong Kim</h1>
            <p className={styles.bigParagraph}>
              안녕하세요. 3년차 웹 개발자 김하영입니다.<br/>
              사람들에게 도움이 되는 일을 하고 싶어서 개발자가 되었습니다.<br/>
              아름다운 인터페이스를 중요하게 생각합니다.
            </p>
          </header>
          <main>
            <section>
              <h2>Work Experience</h2>
              {workExperience.map((elem, idx) => (
                <div className={styles.row}>
                  <div className={styles.rowLeft}>
                    <h3>{elem.name}</h3>
                    <span className={styles.role}>{elem.role}</span>
                    <span>{elem.period}</span>
                  </div>
                  <div className={styles.rowRight}>
                    {elem.projects.map((project, idx) => (
                      <div className={styles.project}>
                        <h3>{project.name}</h3>
                        <span>{project.period}</span>
                        <h4>Description</h4>
                        <p>{project.description}</p>
                        <h4>What did I do</h4>
                        <ul>
                          {project.whatIDid.map((content) => (
                            <li>{content}</li>
                          ))}
                        </ul>
                        <h4>Tech Stack</h4>
                        <p>{project.techStack}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )) }
            </section>
          </main>
        </div>
      </div>
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