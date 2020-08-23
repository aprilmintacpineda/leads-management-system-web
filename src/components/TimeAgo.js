import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import formatDistance from 'date-fns/formatDistance';
import format from 'date-fns/format';

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

  const formatedDate = React.useMemo(() => {
    return format(new Date(pastTime), 'PP');
  }, [pastTime]);

  return (
    <Tooltip title={formatedDate}>
      <span>{state}</span>
    </Tooltip>
  );
}

export default React.memo(TimeAgo);
