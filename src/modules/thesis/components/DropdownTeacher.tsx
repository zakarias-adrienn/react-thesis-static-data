import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const teacherNames= [
{
  key: 1,
  text: 'Visnovitz Márton',
  value: 'Visnovitz Márton'
}, 
{
  key: 2,
  text: 'Horváth Győző',
  value: 'Horváth Győző'
}

];

const DropdownTeacher = () => (
  <Dropdown placeholder='Teacher' search selection options={teacherNames} />
);

export default DropdownTeacher