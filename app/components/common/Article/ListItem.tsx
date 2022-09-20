import React from 'react';
import Typography from '../Typography/Typography';

interface ListItemProps {
  children: string,
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <Typography variant="bodyMedium">
      {children}
    </Typography>
  );
};

export default ListItem;
