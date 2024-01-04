import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { alpha } from '@material-ui/core/styles'

let theme = createTheme({
    palette: {
        primary: {
            main: '#333333',
            light: '#5ca4a9'
        },
        secondary: {
            main: '#5ca4a9'
        },
        common: {
            black: '#363636',
            blue: '#5ca4a9',
            grey: '#333333',
            lightGrey: '#454955',
            white: '#f6f4f3',
            yellow: '#f5aa3d',
            orange: '#FF8552',
            red: '#cc0000',
            green: '#3cb043'
          },
        red: {
            main: '#cc0000'
        },
        green: {
            main: '#3cb043'
        },
        blue: {
            main: '#5ca4a9',
        },
        grey: {
            main: '#333333',
        },
        lightGrey: {
            main: '#454955',
        },
        error: {
            light: '#e57373',
            main: '#E3170A',
            dark: '#C41508',
            contrastText: '#fff'
          }
    },
    typography: {
        fontFamily: [
            'Helvetica',
            'Arial'
        ].join(',')
    }
})

theme = responsiveFontSizes(theme)

export default theme