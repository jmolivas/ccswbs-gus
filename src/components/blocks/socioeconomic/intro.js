import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ title, body, author, author_position, author_pronouns }) => (
    <>
        <h2>{title}</h2>
        {body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
        <p class="author mb-5">
            <strong>{author}</strong> {author_pronouns}
            <br /><em>{author_position}</em>
        </p>
    </>
)

const query = graphql`
  query {
    socioeconomicYaml(id: {eq: "socioeconomic_intro"}) {
      id
      title
      body
      author
      author_position
      author_pronouns
    }
  }
`

export default function SocioEconomicIntro () {
  return <StaticQuery query={query} render={({socioeconomicYaml}) => render(socioeconomicYaml)} />
}