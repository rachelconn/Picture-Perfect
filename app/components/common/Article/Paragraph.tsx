import React from 'react';
import Typography from '../Typography/Typography';
import styles from './styles';

interface ParagraphProps {
  children: string,
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return (
    <Typography variant="bodyMedium">
      {children}
    </Typography>
  );
};

export default Paragraph;
