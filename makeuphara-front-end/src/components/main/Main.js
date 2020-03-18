import React from 'react';
import Button from '../common/Button';
import Header from '../common/Header';

const Main = () => {
  return (
    <>
      <Header />
      <div>main</div>
      <Button>Button</Button>
      <Button>버튼</Button>
      <Button indigo>Button</Button>
      <Button indigo>버튼</Button>
      <Button red>Button</Button>
      <Button red>버튼</Button>
      <Button cyan>Button</Button>
      <Button cyan>버튼</Button>
      <Button yellow>Button</Button>
      <Button yellow>버튼</Button>
    </>
  );
};

export default Main;
