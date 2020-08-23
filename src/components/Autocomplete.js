import React from 'react';
import { VariableSizeList } from 'react-window';

import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import ListSubheader from '@material-ui/core/ListSubheader';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

import TextField from './TextField';

const LISTBOX_PADDING = 8; // px

function renderRow (props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING
    }
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache (data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) ref.current.resetAfterIndex(0, true);
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef(function ListboxComponent (props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = React.useCallback(
    child => {
      if (React.isValidElement(child) && child.type === ListSubheader) return 48;
      return itemSize;
    },
    [itemSize]
  );

  const getHeight = React.useCallback(() => {
    if (itemCount > 8) return 8 * itemSize;
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  }, [itemCount, getChildSize, itemSize, itemData]);

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}>
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

function Autocomplete ({ label, optionLabelKey, error, ...muiAutocompleteProps }) {
  return (
    <MuiAutocomplete
      {...muiAutocompleteProps}
      getOptionLabel={option => option[optionLabelKey]}
      ListboxComponent={ListboxComponent}
      renderInput={props => <TextField {...props} label={label} error={error} />}
    />
  );
}

export default React.memo(Autocomplete);
