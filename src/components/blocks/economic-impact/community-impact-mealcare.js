import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import ModalVideo from "components/shared/modalVideo"
import Overlay from "components/shared/overlay"
import styled from "styled-components"

const SectionTitle = styled.h3`
  font-size: 2.5rem;
  color: #fff;
  text-transform: uppercase;
`
const Testimonial = styled.div`
    background: #000;
`
const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #000;
`
const QuoteSource = styled.p`
    color: var(--uog-blue);
`

const render = ({ title, body, images, video, testimonial }) => (
    <div className="d-flex flex-column bg-dark">
        <Overlay.GatsbyImage gatsbyImageData={getImage(images.background.src)} alt={images.background.alt}>
            <Container className="page-container">
                <Row className="site-content bg-transparent h-100 text-white pb-0">
                    <Col lg={6} className="fs-3 mb-4">
                        <SectionTitle>{title}</SectionTitle>
                        {body.map((paragraph, index) => <p key={`mealcare-text-${index}`}>{paragraph}</p>)}
                        <ModalVideo 
                            id={video.id} 
                            src={video.url} 
                            title={video.title} 
                            transcript={video.transcript} 
                            modalButton = {
                                <button type="button" className="btn btn-primary my-4">
                                    <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                                </button>
                            }
                        />
                    </Col>
                    <Col lg={6} className="d-flex justify-content-center">
                        <GatsbyImage image={getImage(images.foreground.src)} alt={images.foreground.alt} className="align-self-end img-fluid" />
                    </Col>
                </Row>
            </Container>
        </Overlay.GatsbyImage>

        <Testimonial className="d-flex justify-content-center">
            <Row className="w-100 p-5 text-center">
                <QuoteText className="display-3 text-white">
                    <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                        <em>{testimonial.quote}</em>
                    <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
                </QuoteText>
                <QuoteSource className="fs-3">~ {testimonial.source.name}, {testimonial.source.desc}</QuoteSource>
            </Row>
        </Testimonial>
    </div>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_community_mealcare"}) {
        id
        title
        body
        images {
            foreground {
                src {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                 alt
            }
            background {
                src {
                    childImageSharp{
                        gatsbyImageData(
                            width: 1000
                            layout: FULL_WIDTH
                        )
                    }
                }
                alt
            }
        }
        video {
            id
            type
            title
            url
            transcript
            captions
        }
        testimonial {
            quote
            source {
                name
                desc
            }
        }
    }
  }
`

export default function EconImpactCommunityImpactMealcare () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}