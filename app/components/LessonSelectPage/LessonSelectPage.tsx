import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Lesson from '../../classes/lesson';
import { setCurrentLesson } from '../../redux/currentLesson';
import { useDispatch } from '../../redux/store';
import { getLessonStatus, LessonStatus } from '../../utils/lessonStatus';
import IconCard from '../common/IconCard/IconCard';
import { LessonSelectPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';

interface LessonProperties {
  description: string,
  icon: string,
};

const lessons: Record<Lesson, LessonProperties> = {
  [Lesson.Focus]: {
    description: "Learn how a camera's focus works and how to manually focus images.",
    icon: 'image-filter-center-focus',
  },
  [Lesson.Exposure]: {
    description: 'Learn what exposure is, how to judge the exposure of photos, and how to use it to make your images true-to-life.',
    icon: 'contrast-box',
  },
};

const LessonSelectPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LessonSelectPageNavigationProp>();
  const [lessonStatus, setLessonStatus] = React.useState<Partial<Record<Lesson, LessonStatus>>>();

  const fetchLessonStatus = () => {
    getLessonStatus().then((fetchedLessonStatus) => {
      setLessonStatus(fetchedLessonStatus);
    });
  };

  // Query lesson status on initial render
  React.useEffect(() => {
    fetchLessonStatus();

    // Force requery when refocused
    const removeListener = navigation.addListener('focus', fetchLessonStatus);
    return removeListener;
  }, []);

  // Don't render full page until lesson status is fetched
  if (!lessonStatus) return <PageWithAppbar title="Lessons" />;

  const lessonCards = Object.entries(lessons).map(([title, props]) => {
    const lesson = title as Lesson;

    const handlePress = () => {
      dispatch(setCurrentLesson(lesson));
      navigation.navigate(lesson);
    };

    const lessonCompleted = lessonStatus[lesson]?.completed;
    const titleIconProps = lessonCompleted ? {
      titleIcon: 'check-circle-outline',
      titleIconColor: '#009412',
    } : {};

    return (
      <IconCard
        title={title}
        description={props.description}
        icon={props.icon}
        onPress={handlePress}
        key={title}
        {...titleIconProps}
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
