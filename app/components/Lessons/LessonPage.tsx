import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Lesson from '../../classes/lesson';
import AnchoredButton from '../common/AnchoredButton/AnchoredButton';
import Article from '../common/Article/index';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';
import styles from './styles';

interface LessonPageProps {
  title: string,
  lessonId: Lesson,
  children: React.ReactNode,
};

const LessonPage: React.FC<LessonPageProps> = ({ title, children }) => {
  const navigation = useNavigation();

  const handleStartLessonButtonPress = () => {
    navigation.navigate('Camera');
  };

  const startLessonButton = (
    <AnchoredButton
      icon="chevron-right"
      mode="contained"
      onPress={handleStartLessonButtonPress}
    >
      Start Lesson
    </AnchoredButton>
  );

  return (
    <PageWithAppbar
      title={title}
      usePaper
      staticContent={startLessonButton}
      scrollViewStyle={styles.scrollContent}
    >
      <Article.Container>
        {children}
      </Article.Container>
    </PageWithAppbar>
  );
};

export default LessonPage;
