import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import './Header.css';

const Header = () => {
    const displayDesktop = () => {
        return <Toolbar>
            <Typography variant="h6"> Hi From Desktop Header</Typography>
            </Toolbar>;
    };
    return (
      <header className="headerBar">
          <AppBar>{displayDesktop()}</AppBar>
      </header>
    )
};

export default Header;