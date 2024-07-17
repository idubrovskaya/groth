import { Box, Grid, Tab, Tabs, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomTabPanel } from '../../components/tab-panel/custom-tab-panel';
import { tabProps } from '../../core/utils';
import { tokens } from '../../assets/theme';
import { PersonalDataComponent } from '../../components/personal-data/personal-data';
import { useAppDispatch } from '../../core/store/store';
import { getPublicUser } from '../../core/store/auth/auth.actions';

export const SettingsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPublicUser());
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid sx={{ padding: '32px' }}>
      <Box sx={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='Settings tabs'
          centered
          textColor='secondary'
          TabIndicatorProps={{
            style: {
              backgroundColor: colors.blue,
            },
          }}
        >
          <Tab label='Personal data' {...tabProps(0)} />
          <Tab label='Change password' {...tabProps(1)} />
          <Tab label='Delete account' {...tabProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PersonalDataComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Change password
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Delete account
      </CustomTabPanel>
    </Grid>
  );
};
