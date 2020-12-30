import * as React from 'react';

import Button from './Button';
import Subjects from './Subjects';
import Technologies from './Technologies';
import ChooseTheme from './ChooseTheme';
import SearchTeacher from './SearchTeacher';
import SearchByTitle from './SearchByTitle';
import 'office-ui-fabric-react/dist/css/fabric.css';

const SearchPage = () => (
  <React.StrictMode>
      <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6">
                <SearchByTitle></SearchByTitle>
                <ChooseTheme></ChooseTheme>
                <SearchTeacher></SearchTeacher>
              </div>
              <div className="ms-Grid-col ms-sm6">
                <Subjects></Subjects>
                <Technologies></Technologies>
              </div>
          </div>
          <br/>
          <Button></Button>
      </div>
  </React.StrictMode>
);

export default SearchPage;