import React, { useState } from 'react';
import {
    Badge,
    IconButton,
    Popover,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBell = ({ notifications, setNotifications }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const unreadCount = notifications.filter(notification => !notification.read).length;

    return (
        <>
            <IconButton
                aria-label={`${unreadCount} unread notifications`}
                onClick={handleClick}
                sx={{ color: 'white' }}
                size='large'
            >
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ width: 300, maxHeight: 400, overflow: 'auto' }} id="list">
                    <Typography variant="h6" sx={{ p: 2 }}>
                        Notifications
                    </Typography>
                    {notifications.length > 0 ? (
                        <List>
                            {notifications.map((notification) => (
                                <ListItem
                                    key={notification.id}
                                    sx={{
                                        backgroundColor: notification.read ? 'inherit' : 'action.hover',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={notification.message}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography sx={{ p: 2 }}>No notifications</Typography>
                    )}
                </Box>
            </Popover>
        </>
    );
};

export default NotificationBell;

