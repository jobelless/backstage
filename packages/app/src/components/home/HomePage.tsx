import React from 'react';
import Grid from '@material-ui/core/Grid';
import { HomePageCompanyLogo, HomePageToolkit, TemplateBackstageLogoIcon } from '@backstage/plugin-home';

export const HomePage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <HomePageCompanyLogo />
        {/* <HomePageToolkit
          tools={Array(8).fill({
            url: '#',
            label: 'link',
            icon: <TemplateBackstageLogoIcon />,
          })}
        /> */}
      </Grid>
    </Grid>
  );
};