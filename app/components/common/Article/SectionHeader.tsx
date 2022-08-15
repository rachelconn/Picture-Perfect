import React from 'react';
import Typography from '../Typography/Typography';
import styles from './styles';

interface SectionHeaderProps {
  children: string,
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => {
  return (
    <Typography variant="title" style={styles.sectionHeader}>
      {children}
    </Typography>
  );
};

export default SectionHeader;
