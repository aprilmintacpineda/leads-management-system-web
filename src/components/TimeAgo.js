/** @format */

import React from 'react';
import formatDistance from 'date-fns/formatDistance';

function TimeAgo ({ pastTime }) {
  const interval = React.useRef(null);

  const computeTimeAgo = React.useCallback(() => {
    return formatDistance(new Date(pastTime), new Date(), { addSuffix: true });
  }, [pastTime]);

  const [state, setState] = React.useState(computeTimeAgo);

  React.useEffect(() => {
    interval.current = setInterval(() => {
      const timeAgo = computeTimeAgo();
      setState(timeAgo);
    }, 10000);

    return () => {
      clearInterval(interval.current);
    };
  }, [computeTimeAgo]);

  return state;
}

export default React.memo(TimeAgo);
