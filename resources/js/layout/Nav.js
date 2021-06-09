import React from "react";
import {
    Collapse,
    Divider,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    withStyles
} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {useHistory} from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import ToggleButton from "../components/ToggleButton";


const styles = theme => ({
    container: {
        minHeight: '100vh',
        width: 260,
        backgroundColor: theme.palette.common.white,
        borderRight: '2px solid #EAEAEA'
    },
    activeMenu: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.common.black,
    },
    inactiveMenu: {
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.common.black,
    },

    button: {
        marginTop: 18,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    menuTitle: {
        fontWeight: 500,
        marginLeft: 18

    }
})


const AdminMenu = {
    id: 'admin',
    label: 'User accounts',
    icon: 'manage_accounts',
    open: false,
    items: [
        {key: 'official_account', label: 'Official account', active: true},
        {key: 'public_account', label: 'Public account', active: false},
    ]
}


const Nav = ({classes,mobile,toggleDrawer}) => {
    const history = useHistory();
    const [adminMenu, setAdminMenu] = React.useState(AdminMenu);

    const [selectedMenu, setSelectedMenu] = React.useState('dashboard');
    const handleAdminMenuItem = (index, key) => {
        let temp = adminMenu.items;
        const selectedItem = adminMenu.items[index];
        selectedItem.active = !selectedItem.active;
        temp[index] = selectedItem;

        setAdminMenu(prevState => ({
            ...prevState, items: temp
        }))
        switch (index) {
            //Documents
            case 0:
                history.push('/csc/users')
                break;
            //verify
            case 1:
                history.push('/csc/users/public')
                break;
            default:
                break;
        }
        if (mobile) {
            toggleDrawer(!mobile)
        }
    };
    const handleAdminMenu = item => setAdminMenu(prevState => ({...prevState, open: !item.open}))

    const handleMenu=name=>{
        switch (name) {
            case 'courses':
                history.push('/admin/courses');
                break;
        }
        setSelectedMenu('name');
    }
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.container}
        >
            <Hidden mdUp={true}>
                <ListItem onClick={event => {
                    history.push('/')
                    if (mobile) {
                        toggleDrawer(!mobile)
                    }
                }}>
                    <Typography>CZ</Typography>
                </ListItem>
            </Hidden>
            <ToggleButton route={'/admin/dashboard'} primaryText={"Dashboard"} secondaryText={''}/>
            <Divider light={true}/>
            <ListItem divider={true} onClick={event => {
                if (mobile) {
                    toggleDrawer(!mobile)
                }
            }} button={true}>
                <ListItemIcon>
                    <Icon>camera</Icon>
                </ListItemIcon>
                <ListItemText primary={"Videos"}/>
            </ListItem>
            <ListItem divider={true} onClick={event => {
                if (mobile) {
                    toggleDrawer(!mobile)
                }
                handleMenu('courses')
            }} button={true}>
                <ListItemIcon>
                    <Icon>view_sidebar</Icon>
                </ListItemIcon>
                <ListItemText primary={"Courses"}/>
            </ListItem>

            <br/>
            <List>
                <Typography className={classes.menuTitle} paragraph={true}>ADMINISTRATION</Typography>
                <ListItem className={classes.nav} button={true} onClick={event => handleAdminMenu(adminMenu)}>
                    <ListItemIcon style={{marginRight: 1}}>
                        <Icon fontSize={"small"}>{adminMenu.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={adminMenu.label}/>
                    {adminMenu.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={adminMenu.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {adminMenu.items.map((child, index) =>

                            <ListItem key={index} button
                                      onClick={event => handleAdminMenuItem(index, child.key)}>
                                <ListItemIcon>
                                    <Icon>navigate_next</Icon>
                                </ListItemIcon>
                                <ListItemText primary={child.label}/>
                            </ListItem>
                        )}
                    </List>
                </Collapse>

            </List>

            <Divider light={true}/>
            <ListItem onClick={event => {
                // doLogout()
                if (mobile) {
                    toggleDrawer(!mobile)
                }
            }} button={true}>
                <ListItemIcon>
                    <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary={"Logout"}/>
            </ListItem>
        </List>
    )
}


export default withStyles(styles)(Nav);
