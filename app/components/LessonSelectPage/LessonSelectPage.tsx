import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Lesson } from '../../classes/lesson';
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
  const navigation = useNavigation<LessonSelectPageNavigationProp>();

  const lessonCards = Object.entries(lessons).map(([title, props]) => (
    <IconCard
      title={title}
      description={props.description}
      icon={props.icon}
      onPress={() => navigation.navigate(title as Lesson)}
      key={title}
    />
  ));

  return (
    <PageWithAppbar title="Lessons">
      {lessonCards}
    </PageWithAppbar>
  );
};

export default LessonSelectPage;
