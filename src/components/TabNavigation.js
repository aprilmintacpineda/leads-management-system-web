import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import makeStyles from '@material-ui/core/styles/makeStyles';

function TabPanel ({ value, Component, activePanel }) {
  if (value === activePanel) return <Component />;
  return null;
}

const useStyles = makeStyles({
  appbar: {
    boxShadow: 'none'
  }
});

function TabNavigation ({ tabs }) {
  const classes = useStyles();
  const [activePanel, setActivePanel] = React.useState(() => {
    return `${tabs[0].label}-0`;
  });

  const { tabHeaders, tabPanels } = React.useMemo(() => {
    const tabHeaders = [];
    const tabPanels = [];

    tabs.forEach(({ Component, label }, i) => {
      const value = `${label}-${i}`;

      tabHeaders.push(<Tab key={value} value={value} label={label} />);

      tabPanels.push(
        <TabPanel
          key={value}
          value={value}
          Component={Component}
          activePanel={activePanel}
        />
      );
    });

    return { tabHeaders, tabPanels };
  }, [tabs, activePanel]);

  const onChange = React.useCallback((_, value) => {
    setActivePanel(value);
  }, []);

  return (
    <>
      <AppBar position="static" color="default" className={classes.appbar}>
        <Tabs
          value={activePanel}
          onChange={onChange}
          textColor="primary"
          indicatorColor="primary">
          {tabHeaders}
        </Tabs>
      </AppBar>
      {tabPanels}
    </>
  );
}

export default React.memo(TabNavigation);
