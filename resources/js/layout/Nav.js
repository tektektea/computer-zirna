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
import {LOGOUT_API} from "../utils/ApiRoutes";
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import VideoLibraryOutlined from '@material-ui/icons/VideoLibraryOutlined';
import NoteOutlined from '@material-ui/icons/NoteOutlined';
import PermMediaOutlined from '@material-ui/icons/PermMediaOutlined';
import MonetizationOnOutlined from '@material-ui/icons/MonetizationOnOutlined';

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
const AppMenu = {
    id: 'app',
    label: 'App config',
    icon: 'smartphone',
    open: false,
    items: [
        {key: 'corousel', label: 'Corousel', active: true},
        {key: 'banner', label: 'Banner', active: false},
    ]
}
const ResourceMenu = {
    id: 'resource',
    label: 'Resources',
    icon: 'view_list',
    open: false,
    items: [
        {key: 'subject', label: 'Subjects', active: false},
        {key: 'video', label: 'Videos', active: false},
        {key: 'material', label: 'Material', active: false},
        {key: 'image', label: 'Images', active: false},
    ]
}


const Nav = ({classes, mobile, toggleDrawer}) => {
    const history = useHistory();
    const [adminMenu, setAdminMenu] = React.useState(AdminMenu);
    const [appMenu, setAppMenu] = React.useState(AppMenu);
    const [resourceMenu, setResourceMenu] = React.useState(ResourceMenu);

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
    const handleAppMenuItem = (index, key) => {
        let temp = appMenu.items;
        const selectedItem = appMenu.items[index];
        selectedItem.active = !selectedItem.active;
        temp[index] = selectedItem;

        setAppMenu(prevState => ({
            ...prevState, items: temp
        }))
        switch (index) {
            //Documents
            case 0:
                history.push('/admin/app/corousel')
                break;
            //verify
            case 1:
                history.push('/admin/app/banner')
                break;
            default:
                break;
        }
        if (mobile) {
            toggleDrawer(!mobile)
        }
        setSelectedMenu(key)
    };
    const handleAdminMenu = item => setAdminMenu(prevState => ({...prevState, open: !item.open}))
    const handleAppMenu = item => setAppMenu(prevState => ({...prevState, open: !item.open}))
    const handleResourceMenu = item => setResourceMenu(prevState => ({...prevState, open: !item.open}))

    const handleResourceMenuItem = (index, key) => {
        let temp = resourceMenu.items;
        const selectedItem = resourceMenu.items[index];
        selectedItem.active = !selectedItem.active;
        temp[index] = selectedItem;

        setResourceMenu(prevState => ({
            ...prevState, items: temp
        }))
        switch (index) {
            //Documents
            case 0:
                history.push('/admin/subjects');
                break;
            case 1:
                history.push('/admin/videos');
                break;
            case 2:
                history.push('/admin/materials');
                break;
            case 3:
                history.push('/admin/media')
            default:
                break;
        }
        if (mobile) {
            toggleDrawer(!mobile)
        }
        setSelectedMenu(key)
    };

    const handleMenu = name => {
        switch (name) {
            case 'courses':
                history.push('/admin/courses');
                break;
            case 'videos':
                history.push('/admin/videos');
                break;
            case 'media':
                history.push('/admin/media');
                break;
            case 'users':
                history.push('/admin/users');
                break;
            case 'material':
                history.push('/admin/materials');
                break;
            case 'subscriptions':
                history.push('/admin/subscriptions');
                break;
        }
        setSelectedMenu(name);
    }
    const doLogout = () => {
        axios.post(LOGOUT_API)
            .then(res => {
                window.location.replace('/')
            })

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
                    <p className={'title'}>COMPUTER ZIRNA</p>
                </ListItem>
            </Hidden>
            <ToggleButton icon={'dashboard'} route={'/admin/dashboard'} primaryText={"Dashboard"} secondaryText={''}/>
            <Divider light={true}/>

            <ListItem divider={true}
                      selected={selectedMenu === 'courses'}
                      onClick={event => {
                          if (mobile) {
                              toggleDrawer(!mobile)
                          }
                          handleMenu('courses')
                          setSelectedMenu('courses')
                      }} button={true}>
                <ListItemIcon>
                    <NoteOutlined/>
                </ListItemIcon>
                <ListItemText primary={"Courses"}/>
            </ListItem>


            <ListItem divider={true}
                      selected={selectedMenu === 'subscriptions'}
                      onClick={event => {
                          if (mobile) {
                              toggleDrawer(!mobile)
                          }
                          handleMenu('subscriptions')
                          setSelectedMenu('subscriptions')
                      }} button={true}>
                <ListItemIcon>
                   <MonetizationOnOutlined/>
                </ListItemIcon>
                <ListItemText primary={"Subscriptions"}/>
            </ListItem>
            <br/>
            <List>
                <Typography className={classes.menuTitle} paragraph={true}>Manage Resources</Typography>
                <ListItem className={classes.nav} button={true} onClick={event => handleResourceMenu(resourceMenu)}>
                    <ListItemIcon style={{marginRight: 1}}>
                        <Icon fontSize={"small"}>{resourceMenu.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={resourceMenu.label}/>
                    {resourceMenu.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={resourceMenu.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {resourceMenu.items.map((child, index) =>

                            <ListItem key={index} button
                                      selected={selectedMenu === child.key}
                                      onClick={event => {
                                          if (mobile) {
                                              toggleDrawer(!mobile)
                                          }
                                          handleResourceMenuItem(index, child.key)
                                      }}>
                                <ListItemIcon>
                                    <Icon>navigate_next</Icon>
                                </ListItemIcon>
                                <ListItemText primary={child.label}/>
                            </ListItem>
                        )}
                    </List>
                </Collapse>

            </List>
            <List>
                <Typography className={classes.menuTitle} paragraph={true}>Configuration</Typography>
                <ListItem className={classes.nav} button={true} onClick={event => handleAppMenu(appMenu)}>
                    <ListItemIcon style={{marginRight: 1}}>
                        <Icon fontSize={"small"}>{appMenu.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={appMenu.label}/>
                    {appMenu.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={appMenu.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {appMenu.items.map((child, index) =>

                            <ListItem key={index} button
                                      selected={selectedMenu === child.key}
                                      onClick={event => {
                                          if (mobile) {
                                              toggleDrawer(!mobile)
                                          }
                                          handleAppMenuItem(index, child.key)
                                      }}>
                                <ListItemIcon>
                                    <Icon>navigate_next</Icon>
                                </ListItemIcon>
                                <ListItemText primary={child.label}/>
                            </ListItem>
                        )}
                    </List>
                </Collapse>

            </List>
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
                                      onClick={event => {
                                          if (mobile) {
                                              toggleDrawer(!mobile)
                                          }
                                          handleMenu('users')
                                      }
                                      }>
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
                doLogout()
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
