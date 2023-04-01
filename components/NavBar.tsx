import React from 'react'
import Link from 'next/link';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Container, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../pages/_app';

type Props = {}

const NavBar = (props: Props) => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='primary'>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Link href={'/'}>
                            <YouTubeIcon sx={{ mr: 1, fontSize: 44 }} />
                        </Link>
                        {matches &&
                            <Link href={'/'}>
                                <Typography style={{ cursor: 'pointer' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Favourite Youtube Channels
                                </Typography>
                            </Link>
                        }
                        {!matches &&
                            <Link href={'/'}>
                                <Typography style={{ cursor: 'pointer' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>

                                </Typography>
                            </Link>
                        }
                        <Link href={'overall'}>
                            <Button color="inherit">Overall</Button>
                        </Link>
                        <Link href={'year'}>
                            <Button color="inherit">Year</Button>
                        </Link>
                        <Link href={'month'}>
                            <Button color="inherit">Month</Button>
                        </Link>
                        <Link href={'stats'}>
                            <span><Button color="inherit">Stats</Button></span>
                        </Link>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default NavBar