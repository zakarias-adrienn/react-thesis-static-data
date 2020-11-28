import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CheckBoxSubject = () => (
    <div>
        <h3>Válassz témát:</h3>
        <div>
            <Checkbox label={<label>Szakdolgozat</label>} /><br></br>
            <Checkbox label={<label>TDK</label>} />
        </div>
    </div>
)

export default CheckBoxSubject