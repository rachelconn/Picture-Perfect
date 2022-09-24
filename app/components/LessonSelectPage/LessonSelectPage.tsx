import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Lesson } from '../../classes/lesson';
import { setCurrentLesson } from '../../redux/currentLesson';
import { useDispatch } from '../../redux/store';
import IconCard from '../common/IconCard/IconCard';
import { LessonSelectPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';

interface LessonProperties {
  description: string,
  icon: string,
};

const lessons: Record<Lesson, LessonProperties> = {
  Exposure: {
    description: 'Learn what exposure is, how to judge the exposure of photos, and how to use it to make your images true-to-life.',
    icon: 'contrast-box',
  },
};

const LessonSelectPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LessonSelectPageNavigationProp>();

  const lessonCards = Object.entries(lessons).map(([title, props]) => {
    const handlePress = () => {
      const lesson = title as Lesson;
      dispatch(setCurrentLesson(lesson));
      navigation.navigate(lesson);
    };

    return (
      <IconCard
        title={title}
        description={props.description}
        icon={props.icon}
        onPress={handlePress}
        key={title}
      />
    );
  });

  return (
    <PageWithAppbar title="Lessons">
      {lessonCards}
    </PageWithAppbar>
  );
};

export default LessonSelectPage;
