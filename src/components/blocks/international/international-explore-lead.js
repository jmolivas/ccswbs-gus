import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import styled from "styled-components"
import PageContainer from 'components/shared/pageContainer'

const yaml = require('js-yaml');

const Button = styled.a`
  width: 100%;
  padding: 2rem;
  font-size: 3rem;
`

const render = ({ field_yaml_map, relationships }) => {
    let yamlMap;
    let yamlFiles = {};
    relationships.field_yaml_files.forEach(file => {
      yamlFiles[file.path.alias] = file.relationships.field_media_image;
    });

    try {
      yamlMap = yaml.load(field_yaml_map);
    } catch (e) {
      console.log(e);
      return null;
    }
    
    return (
      <PageContainer.SiteContent>
        <PageContainer.ContentArea>
          <Row className="mt-sm-5">
            <h2>{yamlMap.title}</h2>
            <Col md={9} className="pe-5">
              <div dangerouslySetInnerHTML={{__html: yamlMap.body_html}} />
            </Col>
            <Col md={3}>
              <Button href={yamlMap.link.url} className="btn btn-primary text-uppercase text-center">{yamlMap.link.title}</Button>
            </Col>
          </Row>
        </PageContainer.ContentArea>
      </PageContainer.SiteContent>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_explore_lead"}) {
      id
      field_yaml_id
      field_yaml_map
      relationships {
        field_yaml_files {
          id
          name
          relationships {
            field_media_image {
              gatsbyImage(
                width: 1000
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
          path {
            alias
          }
        }
      }
    }
  }
`

export default function InternationalExploreLead() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}