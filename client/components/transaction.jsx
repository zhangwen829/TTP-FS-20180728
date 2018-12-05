import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import Header from './header';

export default class Transaction extends React.Component {
  render() {
    return (<div><Header /><div className="main"> <h2>Transaction</h2>
      <div>
        <List>
          <ListItem>
            <ListItemText>BUY(AAPL)</ListItemText>
            <ListItemText>- 2 shares @ $3.00</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </div>
      <div>
        <List>
          <ListItem>
            <ListItemText>BUY(ATT)</ListItemText>
            <ListItemText>- 5 shares @ $4.80</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </div>
    </div>
    </div>);
  }
}