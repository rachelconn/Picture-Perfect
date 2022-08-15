import { useNavigation } from '@react-navigation/native';
import React from 'react';
import IconCard, { IconCardProps } from '../common/IconCard/IconCard';
import { LessonSelectPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';

const lessons: IconCardProps[] = [
  {
    title: 'Exposure',
    description: 'Learn what exposure is, how to judge the exposure of photos, and how to use it to make your images true-to-life.',
    icon: 'contrast-box',
  }
];

const LessonSelectPage: React.FC = () => {
  const navigation = useNavigation<LessonSelectPageNavigationProp>();

  const lessonCards = lessons.map((lesson) => (
    <IconCard
      title={lesson.title}
      description={lesson.description}
      icon={lesson.icon}
      onPress={() => navigation.navigate('Camera')}
      key={lesson.title}
    />
  ));

  return (
    <PageWithAppbar title="Lessons">
      {lessonCards}
    </PageWithAppbar>
  );
};

export default LessonSelectPage;
