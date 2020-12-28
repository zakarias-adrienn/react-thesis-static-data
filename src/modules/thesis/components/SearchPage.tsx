import * as React from 'react';

import Button from './Button';
import Subjects from './Subjects';
import Technologies from './Technologies';
import ChooseTheme from './ChooseTheme';
import SearchTeacher from './SearchTeacher';
import SearchByTitle from './SearchByTitle';

const SearchPage = () => (
      <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <SearchByTitle></SearchByTitle>
                <ChooseTheme></ChooseTheme>
                <SearchTeacher></SearchTeacher>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Subjects></Subjects>
                <Technologies></Technologies>
              </div>
              <br/>
              <Button></Button>
          </div>
      </div>

);

export default SearchPage;