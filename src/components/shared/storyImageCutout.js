import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Col, Row } from "react-bootstrap"
import Overlay from "components/shared/overlay"
import ModalVideo from "components/shared/modalVideo"
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

function SortContent(content) {
  let sortedContent = {
    quotes: [],
    videos: [],
  };

  content.forEach(element => {
    switch(element.__typename){
      case 'paragraph__story_quote':
        sortedContent.quotes.push(element);
        break;
      case 'paragraph__story_modal_video':
        sortedContent.videos.push(element);
        break;
      default:
        break;
    }
    
  });

  return sortedContent;
}

function StoryImageCutout (props) {
  let story = props.storyData;
  let title = story?.field_story_title;
  let body = story?.field_story_text;

  // images
  let storyRelationships = story?.relationships;
  let foreground = {
    src: storyRelationships?.field_story_image?.relationships?.field_media_image.localFile,
    alt: storyRelationships?.field_story_image?.field_media_image?.alt,
  }
  let background = {
    src: storyRelationships?.field_story_image_bg?.relationships.field_media_image.localFile,
    alt: storyRelationships?.field_story_image_bg?.field_media_image?.alt,
  }

  // quote
  const additionalContent = SortContent(storyRelationships?.field_story_content);

  let video = additionalContent.videos[0]?.relationships?.field_media_video;
  let videoID = video.drupal_id;
  let videoName = video.name;
  let videoSrc = video.field_media_oembed_video;
  let videoTranscript = video.relationships?.field_media_file?.localFile.publicURL;

  let testimonial = additionalContent.quotes[0];
  let testimonialQuoteSource = testimonial.field_quote_source_description ? ', ' + testimonial.field_quote_source_description : '';

  return foreground ? (
    <div className="d-flex flex-column bg-dark">
        <Overlay.GatsbyImage gatsbyImageData={getImage(background.src)} alt={background.alt}>
            <Container className="page-container">
                <Row className="site-content bg-transparent h-100 text-white pb-0">
                    <Col lg={6} className="fs-3 mb-4">
                        <SectionTitle>{title}</SectionTitle>
                        <div dangerouslySetInnerHTML={{__html: body.processed}}></div>  
                        {videoSrc ? <ModalVideo 
                            id={videoID} 
                            src={videoSrc} 
                            title={videoName} 
                            transcript={videoTranscript} 
                            modalButton = {
                                <button type="button" className="btn btn-primary my-4">
                                    <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {videoName}</span>
                                </button>
                            }
                        /> : null }
                     </Col>
                     <Col lg={6} className="d-flex justify-content-center">
                         <GatsbyImage image={getImage(foreground.src)} alt={foreground.alt} className="align-self-end img-fluid" />
                     </Col>
                 </Row>
             </Container>
         </Overlay.GatsbyImage>

        {testimonial.field_story_quote && <Testimonial className="d-flex justify-content-center">
            <Row className="w-100 p-5 text-center">
                <QuoteText className="display-3 text-white">
                    <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                        <em>{testimonial.field_story_quote}</em>
                    <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
                </QuoteText>
                {testimonial.field_quote_source && 
                  <QuoteSource className="fs-3">~ {testimonial.field_quote_source}{testimonialQuoteSource}</QuoteSource>
                }
            </Row>
        </Testimonial>}
      </div>
    ) : null
}

export default StoryImageCutout

export const query = graphql`
  fragment StoryImageCutoutParagraphFragment on paragraph__story_image_cutout_background {
    id
    drupal_id
    field_story_title
    field_story_text {
      processed
    }
    relationships {
      field_story_image {
        ... on media__image {
          name
          field_media_image {
            alt
          }
          relationships {
            field_media_image {
              localFile {
                publicURL
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED,
                    placeholder: BLURRED,
                    height: 440,
                  )
                }
              }
            }
          }
        }
      }

      field_story_image_bg {
        ... on media__image {
          name
          field_media_image {
            alt
          }
          relationships {
            field_media_image {
              localFile {
                publicURL
                childImageSharp {
                  gatsbyImageData(
                    width: 1400,
                    height: 500,
                    placeholder: BLURRED, 
                    layout: CONSTRAINED,
                    transformOptions: {
                      cropFocus: NORTH,
                    }
                  )
                }
              }
            }
          }
        }
      }

      field_story_content {
        __typename
        ... on paragraph__story_quote {
          drupal_id
          field_story_quote
          field_quote_source
          field_quote_source_description
        }
        ... on paragraph__story_modal_video {
          drupal_id
          field_modal_video_button_title {
            processed
          }
          relationships {
            field_media_video {
                ...RemoteVideoFragment
            }
          }
        }
      }
    }
  }

  fragment RemoteVideoFragment on media__remote_video {
    drupal_id
    name
    field_media_oembed_video
    field_video_height
    field_video_width
    relationships {
      field_media_file {
        localFile {
          publicURL
        }
      }
      field_video_cc {
        localFile {
          publicURL
        }
      }
    }
  }
`
