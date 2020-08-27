import React from 'react';

import SendConfirmCode from './SendConfirmCode';
import ConfirmCode from './ConfirmCode';

function ForgotPassword ({ resetLogin }) {
  const [email, setEmail] = React.useState(false);

  const confirmCode = React.useCallback(email => {
    setEmail(email);
  }, []);

  if (email) return <ConfirmCode resetLogin={resetLogin} email={email} />;
  return <SendConfirmCode onSuccess={confirmCode} resetLogin={resetLogin} />;
}

export default React.memo(ForgotPassword);
