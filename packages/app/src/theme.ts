import {
  createTheme,
  genPageTheme,
  lightTheme,
  shapes,
} from '@backstage/theme';

const myTheme = createTheme({
  palette: {
    ...lightTheme.palette,
    primary: {
      main: '#004B89',
    },
    secondary: {
      main: '#565a6e',
    },
    error: {
      main: '#8c4351',
    },
    warning: {
      main: '#00B8D4',
    },
    info: {
      main: '#34548a',
    },
    success: {
      main: '#485e30',
    },
    banner: {
      info: '#34548a',
      error: '#8c4351',
      text: '#004B89',
      link: '#565a6e',
    },
    errorBackground: '#8c4351',
    warningBackground: '#00B8D4',
    infoBackground: '#004B89',
    navigation: {
      background: '#206298',
      indicator: '#00B8D4',
      color: '#d5d6db',
      selectedColor: '#ffffff',
      navItem: {
        hoverBackground: '#00B8D4'
      },
      submenu: {
        background: '#00B8D4',
      }
    },
  },
  defaultPageTheme: 'home',
  fontFamily: 'Causten',
  /* below drives the header colors */
  pageTheme: {
    home: genPageTheme({ colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'], shape: shapes.round }),
    service: genPageTheme({
      colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'],
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'], shape: shapes.wave }),
    app: genPageTheme({ colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'], shape: shapes.wave }),
    apis: genPageTheme({ colors: ['#004B89', '#2962FF', '#0091EA', '#00B8D4'], shape: shapes.wave }),
  },
});

export default myTheme