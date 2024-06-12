import * as React from "react"
import {graphql} from "gatsby"
import * as styles from '../assets/scss/pages/Porfolio.module.scss'

const Resume = ({ data, location }) => {
  const workExperience = [
    {
      name: "스틱인터랙티브",
      role: "Frontend Developer",
      period: "2021.10 - 2024.05",
      projects: [
        {
          name: "밀키스 친밀리미터",
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
          name: "사내 인트라넷 STICK WORKS",
          period: "2022.10 ~ 2024.04",
          description: "사내 인트라넷 서비스인 <a href='https://intranet.stickint.com' target='_blank'>STICK WORKS</a>의 프론트엔드를 개발했습니다.<br/>기본적인 유지보수를 비롯해 비즈니스의 요구에 맞는 다양한 새로운 기능을 개발했습니다.",
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
          description: "<a href='https://www.hanwooboard.or.kr/' target='_blank'>한우자조금 홈페이지</a>의 리뉴얼 구축 작업에서 UI를 개발했습니다.",
          whatIDid: [
            "적응형 페이지로 Scss 기반 퍼블리싱",
            "chart.js 이용한 데이터 시각화",
            "웹 표준 고려하여 시멘틱 요소로 화면을 구성",
            "검색 엔진 최적화와 웹 접근성 준수",
            "webpack 마이그레이션"
          ],
          techStack: "Jquery, SCSS, Gulp, Webpack, PHP"
        },
        {
          name: "롯데주류 프로모션 게임",
          period: "2022.09 ~ 2023.05",
          description: "롯데주류 새로 소주 출시를 기념해 영업을 위한 프로모션 게임의 UI를 개발했습니다.",
          whatIDid: [
            "Vue 기반 컴포넌트 계층 구조 디자인",
            "태블릿 only 반응형 작업",
            "keyframe 활용한 touch 애니메이션 구현",
            "Audio 객체 사용한 효과음 작업",
            "vuex 기반 상태관리"
          ],
          techStack: "Vue, Vuex, SCSS, Cordova"
        },
      ]
    }
  ]

  const skills = [
    {
      name: "Overall",
      content: [
        "아름다운 유저 인터페이스 및 애니메이션 구현을 좋아합니다.",
        "다양한 기기에서 일관된 사용자 경험을 제공하는 반응형 작업에 능숙합니다.",
        "맡은 프로젝트의 목적을 우선으로 고려하며, 함께 할 동료들과의 원활한 협업을 중요하게 생각합니다.",
        "서로의 생각과 의도를 이해하고 이야기를 나눌 때 최상의 결과물을 만들어 낼 수 있다고 생각합니다.",
        "업무에 필요하다면 능숙한 분야가 아니더라도 적극적으로 탐색하여 최적의 결과를 낼 수 있도록 노력합니다."
      ]
    },
    {
      name: "Communication",
      content: [
        "직위 및 포지션에 관계없이 적극적으로 생각을 표현합니다.",
        "커뮤니케이션은 적은 것보다는 많은게 좋다고 믿습니다.",
        "효과적인 회의 진행 및 의사결정 과정을 위해 다양한 협업 도구(JIRA, SLACK 등)를 활용할 줄 압니다.",
      ]
    },
    {
      name: "Web",
      content: [
        "검색엔진최적화(SEO) 경험이 있습니다.",
        "Google 애널리틱스 경험이 있습니다.",
        "모바일 브라우저에서의 트러블 슈팅 경험이 많습니다.",
        "API 통합 및 비동기 작업을 원활하게 처리할 수 있습니다."
      ]
    },
    {
      name: "Javascript",
      content: [
        "Javascript에 능숙하며 Typescript를 사용할 줄 압니다.",
        "CommonJS, ES Modules의 모듈 시스템에 대해서 이해하고 이에 따라 적절한 도구를 활용합니다.",
        "ES6+의 최신 문법과 기능을 활용하여 효율적인 코드를 작성합니다."
      ]
    },
    {
      name: "React",
      content: [
        "React hooks를 적절하게 사용하고, 대부분의 컴포넌트를 함수로 만듭니다. hook을 이용해 공통 비즈니스 로직을 적절히 모듈화해 사용할 수 있습니다.",
        "합리적인 방식으로 컴포넌트를 분리할 줄 압니다.",
        "Redux와 Context API를 사용한 상태 관리 경험이 있습니다.",
        "Styled-components와 Emotion을 사용한 CSS-in-JS 스타일링 경험이 있습니다."
      ]
    },
    {
      name: "Vue",
      content: [
        "Vuex를 사용한 상태 관리에 능숙합니다.",
        "컴포넌트 기반 아키텍처를 이해하고 효율적으로 활용할 수 있습니다.",
        "Vue Router를 사용한 라우팅 설정 및 네비게이션 구현 경험이 있습니다.",
        "Vue CLI를 활용한 프로젝트 셋업 및 관리 경험이 있습니다."
      ]
    }
  ]

  const contact = [
    {
      type: "Email",
      link: "mailto:khy4018@gmail.com"
    },
    {
      type: "Blog",
      link: "https://kirahaa.github.io/"
    },
    {
      type: "Github",
      link: "https://github.com/kirahaa"
    },
    {
      type: "LinkedIn",
      link: "https://www.linkedin.com/in/kirahaa/"
    }
  ]
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <section>
            <h1>Hayeong Kim</h1>
            <p className={styles.bigParagraph}>
              안녕하세요. 3년차 웹 개발자 김하영입니다.<br/>
              아름다운 인터페이스와 애니메이션을 구현하는 것을 좋아합니다.<br/>
              사람들을 돕는 것에 큰 가치와 효용을 느끼며,<br/>항상 새로운 것을 배우고 성장하는 것에 가치를 둡니다.<br/>
              UX와 DX를 모두 고려하는 설계를 하려 노력하고 있습니다.
            </p>
          </section>
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
                        <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
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
            <section>
              <h2>Other Experiences</h2>
              <div className={styles.other}>
                <h3>Voca Vaca</h3>
                <span>2023.02 ~ 2023.03</span>
                <p>개인 프로젝트로 영어 단어를 외울 수 있는 영어 암기장 <a href="https://kirahaa.github.io/vocabulary-learning/" target="_blank">Voca Vaca</a>을 개발했습니다.<br/>
                  기획, 디자인, 개발까지 모두 혼자 진행했으며, React를 공부하는 용도로 만들었습니다.
                </p>
              </div>
              <div className={styles.other}>
                <h3>웹 퍼블리셔 프론트엔드 개발 디지털 실무 양성과정</h3>
                <span>2021.02 ~ 2021.08</span>
                <p>
                  고용노동부에서 주관하는 프론트엔드 개발자 양성 교육 과정을 수강하였습니다.<br/>
                  6개월 동안 HTML, CSS, Javascript 등 기본적인 웹 기초를 교육받았습니다.<br/>
                  페어 프로그래밍, 팀 프로젝트를 통한 협업 경험을 키울 수 있었습니다.
                </p>
              </div>
              <div className={styles.other}>
                <h3>국민대학교</h3>
                <span className={styles.role}>국제학부 러시아학전공</span>
                <span>2016.03 ~ 2021.08</span>
              </div>
            </section>
            <section>
              <h2>Skills</h2>
              {skills.map((skill, idx) => (
                <div className={styles.other}>
                  <h3>{skill.name}</h3>
                  <ul>
                    {skill.content.map((elem, idx) => (
                      <li>{elem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section>
              <h2>Contact</h2>
              <ul>
                {contact.map((elem, idx) => (
                  <li>
                    <a href={elem.link} target="_blank">{elem.type}</a>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
export default Resume

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