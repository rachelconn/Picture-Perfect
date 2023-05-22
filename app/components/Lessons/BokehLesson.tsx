import React from 'react';
import Article from '../common/Article/index';
import LessonPage from './LessonPage';
import Lesson from '../../classes/lesson';
import bokehDiagram from '../../images/bokehdiagram.png';
import bokehImage1 from '../../images/bokeh1.jpg';
import bokehImage2 from '../../images/bokeh2.jpg';
import bokehImage3 from '../../images/PLACEHOLDERbokeh.jpg';

const bokehImageListCaption ='These images exhibit various degrees and types of bokeh. Consider which ones ones look good or bad to you, and think about why that is.';
const bokehFocusDiagramCaption = 'This diagram shows the area of an image that is in focus, and how focus is gradually lost the further you are from that area. Notice that an area rather than a slice of the image is completely focused.';

const BokehLesson: React.FC = () => {
  return (
    <LessonPage title="Bokeh" lessonId={Lesson.Bokeh}>
      <Article.SectionHeader>What is Bokeh?</Article.SectionHeader>
      <Article.Paragraph>
        Bokeh is an aesthetic quality of a photograph where the subject is sharply in focus,
        while the background is blurred.
        It can be used for a variety of reasons such as placing emphasis on the subject,
        making messy backgrounds more pleasant to look at, or to create interesting visual effects.
        You can see a couple photos that exhibit bokeh below.
      </Article.Paragraph>
      <Article.CaptionedImageList sources={[bokehImage1, bokehImage2, bokehImage3]} caption={bokehImageListCaption} />
      <Article.Paragraph>
        Knowing what bokeh is and how to create photos with it can be a great tool
        for improving your photos.
        While not every photo needs to (or should) utilize bokeh,
        using it tastefully can help you to create interesting photos
        and express yourself through your photography.
      </Article.Paragraph>
      <Article.SectionHeader>Learning More About Focus</Article.SectionHeader>
      <Article.Paragraph>
        In the previous lesson on focus,
        you learned that when taking a photo there is a single area that's completely in focus,
        and that this focus area can be moved forward or backward by adjusting your camera's focus.
        Here, we will develop a more nuanced understanding of how this plane of focus works,
        and how to manipulate it to create bokeh.
        While the diagram from the focus lesson is a useful tool when first learning how focus works,
        it is a simplification.
        The diagram below should help give you a more complete understanding of how the plane of focus works.
      </Article.Paragraph>
      <Article.CaptionedImage source={bokehDiagram} caption={bokehFocusDiagramCaption} />
      <Article.SectionHeader>Understanding Depth of Field</Article.SectionHeader>
      <Article.Paragraph>
        In the image above, you can see that rather than a single flat plane being in focus,
        all of the area between a near and far plane is in focus,
        and the further an area is from that area, the less sharp the image.
        The depth of this in-focus area is known as depth of field,
        where having a larger depth of field means both that a larger area will be in focus,
        and that the blurring as you get further from the plane of focus becomes more gradual.
        Depth of field can be manipulated in two ways: changing the focal distance and adjusting aperture.
        The closer the camera is focused, the narrower the depth of field will be and vice versa.
        Thus, one technique for creating a narrow depth of field (and allow for bokeh) is by changing the focus to be closer to the camera.
        Unfortunately, a lack of adjustable aperture is one area in which phone cameras have to make compromises compared to traditional cameras due to their compact nature.
        This makes creating bokeh with a smartphone camera is much more difficult,
        and thus in order to take photos with bokeh you'll have to employ a clever understanding of depth of field
        to make up for the lack of an adjustable aperture.
      </Article.Paragraph>
      <Article.SectionHeader>How to Create Bokeh</Article.SectionHeader>
      <Article.Paragraph>
        Recall that bokeh means having contrast between an in-focus subject and a highly blurred background.
        With a traditional camera, this can be done relatively easily by making the aperture more narrow,
        meaning that objects even slightly outside the plane of focus can be heavily blurred.
        However, with a phone camera you'll have to create this effect by making good use of perspective.
        Here are a couple tips for creating photos with bokeh:
      </Article.Paragraph>
      <Article.BulletedList>
        <Article.ListItem>
          Move closer to your subject in order to narrow the depth of field and more heavily blur areas relatively closer to your subject. Going as close as a few inches away, it can be much easier to create bokeh than from far away.
        </Article.ListItem>
        <Article.ListItem>
          Make sure the background is relatively far from the subject: as a rule of thumb, the background should be around twice as far from your camera as the subject, but further is better!
        </Article.ListItem>
      </Article.BulletedList>
      <Article.SectionHeader>Your Task</Article.SectionHeader>
      <Article.Paragraph>
        Find an object to use as your subject, and use the techniques you learned here to take a picture exhibiting bokeh.
        Controlling the distance of your subject and background is key to creating photos with great bokeh!
      </Article.Paragraph>
    </LessonPage>
  );
};

export default BokehLesson;
