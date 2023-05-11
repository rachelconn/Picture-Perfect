import React from 'react';
import Lesson from '../../classes/lesson';
import Article from '../common/Article/index';
import LessonPage from './LessonPage';
import bokehImage from '../../images/PLACEHOLDERbokeh.jpg';
import focusDiagram from '../../images/focusdiagram.png';
import inFocusImage from '../../images/infocus.jpg';
import outOfFocusImage from '../../images/outoffocus.jpg';
import veryOutOfFocusImage from '../../images/veryoutoffocus.jpg';

const focusExampleImages = [veryOutOfFocusImage, outOfFocusImage, inFocusImage];
const focusExampleCaption = 'Otherwise identical images taken with varying focal lengths. Notice how better focus lets you see much more detail in the image.';
const bokehImageCaption = 'This image exhibits bokeh, a photographic style where a blurred background is used to further emphasize the subject.';
const focusDiagramCaption = 'A diagram showing the plane of focus: depending on the focus settings, the plane can be closer or further from the camera.';

const FocusLesson: React.FC = () => {
  return (
    <LessonPage title="Focus" lessonId={Lesson.Focus}>
      <Article.SectionHeader>Introduction</Article.SectionHeader>
      <Article.Paragraph>
        Having proper focus is one of the most important aspects of photography:
        even to the untrained eye, an out-of-focus image is easy to recognize
        and can draw attention from anything else in a photo.
      </Article.Paragraph>
      <Article.CaptionedImageList sources={focusExampleImages} caption={focusExampleCaption} />
      <Article.Paragraph>
        It's important to have a good understanding of how to control focus,
        as the way an image is focused has a huge effect on how people look at it.
        For now, you'll be experimenting with how to get a photograph in focus.
        In a later lesson, you'll be manipulating focus to emphasize your subject
        by having it in-focus and the background out-of-focus.
      </Article.Paragraph>
      <Article.CaptionedImage source={bokehImage} caption={bokehImageCaption} />
      <Article.SectionHeader>How Focus Works</Article.SectionHeader>
      <Article.Paragraph>
        When taking a photograph, the focus is adjusted by changing the distance between the camera's image plane and lens.
        Depending on this distance, a different area (known as the "plane of focus") will be in perfect focus,
        and anything outside of the plane of focus will be blurred:
        objects close to it will only be slightly blurred, while objects far outside of it can become very blurry.
      </Article.Paragraph>
      <Article.CaptionedImage source={focusDiagram} caption={focusDiagramCaption} />
      <Article.Paragraph>
        Adjusting focus is fairly straightforward, as on a smartphone there are only two factors you can control:
        the camera's focus distance, which determines how far the plane of focus is from the camera,
        and your distance from objects in the image.
        Generally, it's a good idea to first get into position for the shot composition that you want,
        then adjust the focus distance until your subject is in focus.
      </Article.Paragraph>
      <Article.SectionHeader>Your Task</Article.SectionHeader>
      <Article.Paragraph>
        Use what you learned to take a picture that's entirely in focus—
        don't worry too much about controlling anything else about the photo.
        We recommend you take a picture of something that's relatively flat that
        has enough detail to tell whether the image is in focus
        (such as text or an interesting pattern), but feel free to take a picture
        of anything you want!
      </Article.Paragraph>
    </LessonPage>
  );
};

export default FocusLesson;
