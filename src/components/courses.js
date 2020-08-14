import React from 'react';
import PropTypes from 'prop-types';
import '../styles/courses.css';

function Courses ({ courseData, courseNotes }) {
	var courses;
	var courseURL;
	var courseList="";
	var trackCourseLevel="";
	var coursesDisplay="<section class='row row-with-vspace'>";

	if ((courseData !== null) && (courseData !== undefined)) {
		courseData.forEach(course => {
			var courseTitle = course.node.title;
			let displayLevel = "";
			if(trackCourseLevel !== course.node.field_level){
				trackCourseLevel = course.node.field_level;
			}else {
				displayLevel=" class='sr-only'";
			}
			
			courseURL = (course.node.field_course_url !== undefined && course.node.field_course_url !== null ? courseURL = course.node.field_course_url.uri : "");
			courseTitle = (courseURL !== "" ? "<a href='" + courseURL + "'>" + courseTitle + "</a>" : courseTitle);
			courseList += "<tr>";
			courseList += "<td class='course-field-level'><strong" + displayLevel + ">" + course.node.field_level + "</strong></td>";
			courseList += "<td>" + courseTitle + "</td>";
			courseList += "<td>" + course.node.field_code + "</td>";
			courseList += "<td>" + course.node.field_credits + "</td>";
			courseList += "</tr>";
		});
		if (courseList !== "") {
			courses = "<div class='col-md-6'><table class='table table-borderless'><thead><tr><th scope='col'>Year</th><th scope='col'>Class</th><th scope='col'>Code</th><th scope='col'>Credits</th></tr></thead><tbody>" + courseList + "</tbody></table></div>";
			coursesDisplay += courses;
		}		
	}

	if (courseNotes !== null) {
		coursesDisplay += "<div class='col-md-6'><h3 class='course-notes-heading'>Notes</h3>" + courseNotes + "</div>";
	}

	coursesDisplay += "</section>";

	return <div className="container" dangerouslySetInnerHTML={{__html: coursesDisplay}}/>
}

Courses.propTypes = {
	courseData: PropTypes.array,
	courseNotes: PropTypes.string,
}
Courses.defaultProps = {
	courseData: null,
	courseNotes: "",
}
export default Courses