import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
        <Layout>
			<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
				<h1>Gatsby UG Starter Theme</h1>
				<p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>
				<h2>Pages</h2>
				<ul>
					{data.allNodePage.edges.map(edge => (
						<li><Link to={edge.node.fields.alias.value}>{edge.node.title}</Link></li>
					))}
				</ul>

				<h2>Specializations</h2>
				<ul>
					{data.specializations.edges.map(edge => (
						<li><Link to={edge.node.fields.alias.value}>{edge.node.name}</Link></li>
					))}
				</ul>

				<h2>Majors</h2>
				<ul>
					{data.majors.edges.map(edge => (
						<li><Link to={edge.node.fields.alias.value}>{edge.node.name}</Link></li>
					))}
				</ul>
        </Layout>
	)

export default IndexPage

export const query = graphql`
  query {
	  allNodePage {
		edges {
		  node {
			title
			drupal_id
			fields {
				alias {
					value
				}
			}
		  }
		}
	  }

	  specializations: allTaxonomyTermSpecializations {
		edges {
		  node {
			drupal_id
			drupal_internal__tid
			name
			acronym: field_specialization_acronym
			description {
			  processed
			}
			fields {
				alias {
					value
				}
			}
		  }
		}
	  }

	  majors: allTaxonomyTermMajors {
		edges {
		  node {
			drupal_id
			drupal_internal__tid
			name
			description {
			  processed
			}
			fields {
				alias {
					value
				}
			}
		  }
		}
	  }
	  
	  
	}
`