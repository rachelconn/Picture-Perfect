import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native-paper';
import Lesson from '../../classes/lesson';
import { setCurrentLessonSection } from '../../redux/currentLesson';
import { useDispatch } from '../../redux/store';
import Article from '../common/Article/index';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';
import styles from './styles';

interface LessonPageProps {
  title: string,
  lessonId: Lesson,
  sectionId: string,
  children: React.ReactNode,
};

const LessonPage: React.FC<LessonPageProps> = ({ title, children, sectionId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleStartLessonButtonPress = () => {
    // TODO: fix typing, set correct props on navigation
    dispatch(setCurrentLessonSection(sectionId));
    navigation.navigate('Camera');
  };

  const startLessonButton = (
    <Button
      icon="chevron-right"
      mode="contained"
      style={styles.startLessonButton}
      contentStyle={styles.startLessonButtonContent}
      onPress={handleStartLessonButtonPress}
    >
      Start Lesson
    </Button>
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
