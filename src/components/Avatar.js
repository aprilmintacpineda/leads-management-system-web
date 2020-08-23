import React from 'react';
import { Storage } from 'aws-amplify';
import MuiAvatar from '@material-ui/core/Avatar';

function Avatar ({ firstName = '', lastName = '', src, ...muiAvatarProps }) {
  const [imgSrc, setImgSrc] = React.useState('');

  const onError = React.useCallback(() => {
    if (firstName || lastName) {
      setImgSrc(
        `https://ui-avatars.com/api/?name=${firstName}+${lastName}&rounded=true&size=150`
      );
    }
  }, [firstName, lastName]);

  const getSrc = React.useCallback(async () => {
    const httpLink = await Storage.get(src);
    if (httpLink) setImgSrc(httpLink);
  }, [src]);

  React.useEffect(() => {
    getSrc();
  }, [getSrc]);

  return <MuiAvatar src={imgSrc} imgProps={{ onError }} {...muiAvatarProps} />;
}

export default React.memo(Avatar);
