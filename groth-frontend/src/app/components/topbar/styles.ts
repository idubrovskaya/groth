import { makeStyles } from '@mui/styles';
import { tokens } from '../../../assets/theme';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => {
  // const colors = tokens(theme.palette.mode);
  return {
    root: {
      position: 'static',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2rem 1.5rem',
      // backgroundColor:colors.primary.DEFAULT
      maxHeight: '95px',
      // borderBottom:`1px solid ${colors.borderColor}`
    },
    iconsBlock: {
      paddingRight: '37px',
      paddingTop: '10px',
      // borderRight: `1px solid ${colors.borderColor}`,
    },
    searchIcon: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    searchInput: { padding: '1rem 0.rem' },
    searchBlock: {
      display: 'flex',
      borderRadius: '8px',
      // backgroundColor: `${colors.primary[600]}`,
      marginLeft: '28px',
    },
    themeIcon: { marginLeft: '45px' },
  };
});
