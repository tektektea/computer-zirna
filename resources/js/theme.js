import {createMuiTheme} from "@material-ui/core";
import React from "react";

let theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1324,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            light: '#E0E7F4',
            main: '#3A66B5',
            dark: '#006db3',
        },
        error: {
            light: '#FFE2E2',
            main: '#d67878',
            dark: '#540808'
        }
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    overrides: {

        MuiTableRow: {
            root: {
                color: "white",
                height: 48,
                "&:hover": {
                    color: "black",
                    background: theme.palette.primary.light
                }
            }
        },
        // MuiTableHead:{
        //     root:{
        //         backgroundColor:theme.palette.primary.light,
        //         borderRadius:30
        //     }
        // },
        MuiTableCell: {
            root: {
                padding: '8px 16px',
                borderBottom: 'none'
            }
        },
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c',
            },
        },
        MuiFormControlLabel: {
            root: {
                fontSize: 16
            },
            label:{
                width:120
            }
        },
        MuiPaper: {},
        MuiFormLabel: {
            root: {
                fontSize: 16,
                fontWeight: 500
            }
        },

        MuiOutlinedInput: {
            root: {
                borderRadius: 4
            },

        },

        MuiFormHelperText: {
            root: {
                marginTop: 0
            },
            marginDense: {
                marginTop: 0
            }
        },

        MuiTabs: {
            root: {
                marginLeft: theme.spacing(1),
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
                margin: '0 16px',
                minWidth: 0,
                padding: 0,
                [theme.breakpoints.up('md')]: {
                    padding: 0,
                    minWidth: 0,
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing(1),
            },
        },
        MuiButtonBase: {
            root: {
                boxShadow: "none"
            }
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItem: {
            root: {
                "&$selected": {
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.primary.main

                },
                "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.light,
                    borderRight: `3px solid ${theme.palette.primary.main}`,
                }
            }
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightRegular,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                minWidth: 32,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiCheckbox: {
            root: {
                color: theme.palette.primary.main,
                '&$checked': {
                    color: "green"
                }

            },
            checked: {}
        },
        MuiStepper: {
            root: {
                backgroundColor: 'transparent'
            }
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
        MuiCard: {
            root: {
                border: '1px solid #DDDDDD',
                borderRadius: 12,
                backgroundColor: '#FFFFFF'
            }
        },
        MuiCardContent:{
            root:{
                padding:24
            }
        },
        MuiCardHeader:{
            root:{
                padding:24
            },
            title:{
                fontSize:18
            }
        },
        MuiCardActions: {
            root: {
                padding: 24
            }
        },

    },


}

export default theme;
