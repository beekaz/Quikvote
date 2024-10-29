import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Countdown from 'react-countdown';
import { setCountdown } from 'src/Storage';

const CountdownComponent = () => {
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Typography variant="h5" style={{ color: 'red', fontSize: '18px' }}>
          Already!{' '}
        </Typography>
      );
    } else {
      return (
        <Typography variant="h5" style={{ color: 'green', fontSize: '18px' }}>
          {days} days {hours}:{minutes}:{seconds}
        </Typography>
      );
    }
  };

  useEffect(() => {
    if (isCountdownComplete === true) {
      setCountdown(true);
    }
    if (isCountdownComplete === false) {
      setCountdown(false);
    }
  }, [isCountdownComplete]);

  return (
    <Countdown
      date={new Date('10/04/2024')}
      renderer={renderer}
      onComplete={() => setIsCountdownComplete(true)}
    />
  );
};

export default CountdownComponent;
