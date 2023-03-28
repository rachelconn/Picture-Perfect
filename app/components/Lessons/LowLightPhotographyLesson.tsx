import React from 'react';
import lowLightNoisyPhoto from '../../images/PLACEHOLDERlowlightnoisy.jpg';
import Article from '../common/Article/index';
import LessonPage from './LessonPage';
import Lesson from '../../classes/lesson';

// TODO: add pictures and examples!

const noisyPhotoCaption = 'This image is very noisy due to a high ISO value being used to compensate for dim lighting.';

const LowLightPhotographyLesson: React.FC = () => {
  return (
    <LessonPage title="Low-Light Photography" lessonId={Lesson.LowLight}>
      <Article.SectionHeader>Introduction</Article.SectionHeader>
      <Article.Paragraph>
        Now that you have an idea of how to control your camera's exposure,
        it's time to learn how to adapt what you learned
        to take great photos even in adverse environments—
        in this lesson, places with very dim light.
        Low-light photography is one setting where being in full control of your camera
        can be especially useful, as auto modes often leave photos very underexposed.
        In this lesson, we'll discuss some of the challenges that come with these low-light environments,
        and how to adjust your camera to create vivid photos in them.
      </Article.Paragraph>
      <Article.SectionHeader>Challenges of low-light photography</Article.SectionHeader>
      <Article.Paragraph>
        While you should always take noise and motion blur into account when taking a photo,
        low-light conditions can exacerbate these issues.
        Often times, low-light photos can come out looking something like the picture below:
      </Article.Paragraph>
      <Article.CaptionedImage source={lowLightNoisyPhoto} caption={noisyPhotoCaption} />
      <Article.Paragraph>
        Naturally, it can be tempting to raise your camera's ISO value to compensate for a lack of light.
        However, doing so can lead to photos like the one above, where even a moderate ISO value
        can be compounded with a longer exposure time and create a large amount of noise.
        If you want to take great-looking photos in these environments,
        focus on increasing the exposure time
        (depending on how much light there is, this could mean up to a second or even higher)
        and be more conservative with the ISO you use.
        Finding this balance can be difficult,
        as longer exposure times can lead to motion blur due to moving the camera during the exposure.
        Consider taking steps to keep your camera steady and keep your photos sharp.
      </Article.Paragraph>
      <Article.SectionHeader>Steadying your camera</Article.SectionHeader>
      <Article.Paragraph>
        The simplest way to ensure a sharp image would be to use a tripod:
        this should hold your camera completely still, and ensure that there's no shakiness when taking a photo.
        However, using a tripod might not always be feasible,
        in which case there are a few techniques you can employ to reduce blur:
      </Article.Paragraph>
      <Article.BulletedList>
        <Article.ListItem>
          Place your camera on top of a stationary object such as a table or floor to steady your camera and limit its range of motion.
        </Article.ListItem>
        <Article.ListItem>
          Lean against a wall to keep your body stable, reducing the shakiness caused by your body swaying.
        </Article.ListItem>
        <Article.ListItem>
          Keep your elbows tucked and close to your body.
          This should provide a better foundation for your camera to rest on and reduce the amount of horizontal movement.
        </Article.ListItem>
        <Article.ListItem>
          Control your breathing: holding your breath either completely in or out during the exposure could help,
          or you might find better success by maintaining slow and steady breathing.
        </Article.ListItem>
      </Article.BulletedList>
      <Article.Paragraph>
        Try experimenting with each of these techniques to see which ones work for you.
        Everyone is different, so don't feel bad if it takes a while to find what works best!
      </Article.Paragraph>
      <Article.SectionHeader>Your Task</Article.SectionHeader>
      <Article.Paragraph>
        Take a photo in a low-light setting—
        this could be at night, in a room with the lights off, or a very dimly lit environment.
        Try to use what you learned to minimize the noise present while keeping the photo sharp.
        This means experimenting with ISO values to minimize noise and using one or more of the techniques
        discussed here to prevent motion blur.
      </Article.Paragraph>
    </LessonPage>
  );
};

export default LowLightPhotographyLesson;
