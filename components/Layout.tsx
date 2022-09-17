import Container from '@mui/material/Container';
import React from 'react'
import NavBar from './NavBar';

interface Props {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => (
    <>
        <NavBar></NavBar>
        <Container>
            {children}
        </Container>

    </>
)

export default Layout