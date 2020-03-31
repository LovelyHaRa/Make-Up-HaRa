import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

export const PurpleSwitch = withStyles({
  root: {},
  switchBase: {
    color: blueGrey[300],
    '&$checked': {
      color: blueGrey[700],
    },
    '&$checked + $track': {
      backgroundColor: blueGrey[700],
    },
  },
  thumb: {},
  checked: {},
  track: {},
})(Switch);
