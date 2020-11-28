
import React from "react";
import { PrimaryButton } from '@fluentui/react';
import { Card } from '@uifabric/react-cards';

const MyHello = () => (
  <div>
    <Card>
      <h2>Cím</h2>
      <h4>Tanár</h4>
      <h4>Leírás</h4>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
        Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
        Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
      <h4>Technológiák</h4>
      <PrimaryButton>Jelentkezek</PrimaryButton>
    </Card>
  </div>
);

export default MyHello
