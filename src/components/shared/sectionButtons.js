import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import Button from 'components/shared/button';

function SectionButtons (props) {

    const fieldButtonsData = props.pageData.relationships?.field_buttons;
    const buttonCol = props.pageData.relationships?.field_section_column?.name;
    
    let buttonSpacing;
    
    if (buttonCol !== "right" || buttonCol !== "Secondary") {
        buttonSpacing = "me-md-3";
    }
    
    return (
        <React.Fragment>
            <div className="d-grid d-md-block gap-2">
            {fieldButtonsData?.length > 0 && <>
                {fieldButtonsData.map (buttonData => {
                    return Button(buttonData, buttonSpacing)
                })}
            </>}
           </div>
        </React.Fragment>
    )
}

SectionButtons.propTypes = {
    pageData: PropTypes.object,
}

SectionButtons.defaultProps = {
    pageData: ``,
}

export default SectionButtons

export const query = graphql`
  fragment SectionButtonsParagraphFragment on paragraph__section_buttons {
    drupal_id
    relationships {
      field_section_column {
        name
      }
      field_buttons {
        drupal_id
        field_button_link {
          title
          uri
          url
        }
        field_cta_heading {
          processed
        }
        field_font_awesome_icon
        field_formatted_title {
          processed
        }
        relationships {
          field_button_style {
            name
          }
          field_font_awesome_icon_colour {
            name
          }
          field_cta_analytics_goal {
            name
            field_goal_action
          }
        }
      }
    }
  }
`
