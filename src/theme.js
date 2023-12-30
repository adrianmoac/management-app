import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'
// import { alpha } from '@material-ui/core/styles'

let theme = createTheme({
    palette: {
        primary: {
            main: '#cc0000',
            light: '#5ca4a9'
        },
        common: {
            black: '#363636',
            blue: '#24aded',
            grey: '#E7E7E7',
            pink: '#ed7fbd',
            white: '#fff',
            yellow: '#f5aa3d',
            orange: '#FF8552'
          },
        gray: {
            main: '#333333'
        },
        lightGray: {
            main: '#454955'
        },
        white: {
            main: '#f6f4f3',
            light: '#ffffff'
        },
        blue: {
            main: '#5ca4a9'
        },
        red: {
            main: '#cc0000'
        },
        green: {
            main: '#3cb043'
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