import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import FocusAwareStatusBar from '../FocusAwareStatusBar/FocusAwareStatusBar';
import styles from './styles';

interface PageWithAppbarProps {
  title: string,
  children?: React.ReactNode,
  scrollViewStyle?: any,
  staticContent?: React.ReactNode,
  usePaper?: boolean,
};

const PageWithAppbar: React.FC<PageWithAppbarProps> = ({
  title,
  children,
  scrollViewStyle = {},
  staticContent,
  usePaper = false,
}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const backgroundComputedStyle = { ...styles.background };
  if (usePaper) backgroundComputedStyle.backgroundColor = 'white';

  const handleBackPress = () => { navigation.goBack() };

  const staticContentComponent = staticContent && (
    <View style={styles.fixedContentContainer}>
      {staticContent}
    </View>
  );

  return (
    <View style={backgroundComputedStyle}>
      <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor={`${theme.colors.primary}`} />
      <View style={styles.pageContainer}>
        <Appbar.Header>
          <Appbar.Action icon="arrow-left" onPress={handleBackPress} />
          <Appbar.Content title={title} />
        </Appbar.Header>
        <ScrollView
          style={styles.contentAreaContainer}
          contentContainerStyle={{ ...styles.contentArea, ...scrollViewStyle }}
        >
          {children}
        </ScrollView>
        {staticContentComponent}
      </View>
    </View>
  );
};

export default PageWithAppbar;
