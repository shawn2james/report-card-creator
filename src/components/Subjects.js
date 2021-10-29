import React from 'react';
import StyledSubjects from './styles/Subjects.styled';
import SubjectsList from './SubjectsList';
import MaxMarksList from './MaxMarksList';

const Subjects = ({ subjects, userSubjects, manageChange }) => (
	<StyledSubjects>
		<SubjectsList subjects={subjects} manageChange={manageChange} />
		<MaxMarksList userSubjects={userSubjects} />
	</StyledSubjects>
);

export default Subjects;