import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

export default class Holding extends React.Component {
  render() {
    return (
      <div>
        <h3>Portfolio ($5943.34)</h3>
        <List>
          <ListItem>
            <ListItemText>AAPL</ListItemText>
            <ListItemText>6 shares</ListItemText>
            <ListItemText>$2043.04</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText>GOOG</ListItemText>
            <ListItemText>10 shares</ListItemText>
            <ListItemText>$1086.03</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}