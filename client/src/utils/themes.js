const colorSchemes = {
    redGreen: {
        dark: '#393F26',
        light: '#818474',
        highlight: '#EDDDD4',
        splash: '#AD0101'
    }
}

const getTheme = themeName => {
    const {dark, light, highlight, splash} = colorSchemes[themeName];
    return {
        darkBg: {
            backgroundColor: dark
        },
        lightBg: {
            backgroundColor: light
        },
        buttons: {
            backgroundColor: splash,
            border: `2px solid ${highlight}`,
            boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)'
        },
        mainText: {
            color: dark
        },
        lightText: {
            color: highlight
        },
        titleText: {
            color: splash,
            textShadow: `1px -1px 0 ${highlight}, 1px -1px 0 ${highlight}, -1px 1px 0 ${highlight}, 1px 1px 0 ${highlight}`
        }
    }
}

export default getTheme;