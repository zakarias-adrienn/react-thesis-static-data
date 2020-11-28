
import React from 'react';
import CheckBoxSubject from './CheckBoxSubject';
import DropdownTeacher from './DropdownTeacher';
import SearchByTitle from './SearchByTitle';
import ThesisTable from './ThesisTable';

const SearchPage = () => (
    <div>
        <CheckBoxSubject />
        <br/>
        <DropdownTeacher />
        <br/><br/>
        <SearchByTitle />
        <br/>
        <ThesisTable />
    </div>
);

export default SearchPage