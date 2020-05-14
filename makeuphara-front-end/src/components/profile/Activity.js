import React from 'react';
import styled from 'styled-components';

const ActivityBlock = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
`;

const Activity = () => {
  return (
    <ActivityBlock>
      <div>활동 기록 영역</div>
    </ActivityBlock>
  );
};

export default Activity;
