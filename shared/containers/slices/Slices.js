import React from 'react';
import PropTypes from 'prop-types';

import { getField } from 'utils/prismic';

import Image from 'components/image';
import Contact from 'components/contact';
import Gallery from 'components/gallery';
import Text from 'components/text';
import Quote from 'components/quote';
import Video from 'components/video';
import Profiles, { Profile } from 'components/profiles';

const Slices = ({ data }) => (
  <div>
    {data.map((s, i) => {
      const key = `slice-${s.slice_type}-${i}`;

      switch (s.slice_type) {

        case 'gallery':
          return (
            <Gallery
              key={key}
              title={getField(s.primary.title, 'text')}
              data={s.items}
            />
          );

          case 'profiles':
            return (
              <Profiles
                title={getField(s.primary.profiles_title, 'text')}
                key={key}
              >
                {s.items.map(({ profile_link: { data: { name, bio, image } } }, k) => (
                  <Profile
                    key={`profile-${k}`} // eslint-disable-line
                    image={getField(image).url}
                    name={getField(name, 'text')}
                    description={getField(bio, 'text')}
                  />
                ))}
              </Profiles>
            );

          case 'contact_form':
            return (
              <Contact
                key={key}
                responseTitle={getField(s.primary.response_message_title, 'text')}
                responseText={getField(s.primary.response_message_text, 'text')}
                target={getField(s.primary.target_url, 'text')}
              />
            );

          case 'image':
            return (
              <Image
                key={key}
                width={s.primary.image.dimensions.width}
                height={s.primary.image.dimensions.height}
                alt={s.primary.image.alt}
                src={s.primary.image.url}
                caption={getField(s.primary.caption, 'richtext')}
              />
            );

          case 'text':
            return (
              <Text
                key={key}
                text={s.primary.text}
              />
            );

          case 'quote':
            return (
              <Quote
                key={key}
                text={s.primary.quote}
              />
            );

          case 'video':
            return (
              <Video
                key={key}
                url={s.primary.video.url}
                caption={getField(s.primary.caption, 'richtext')}
              />
            );

          default:
            return null;
      }
    })}
  </div>
);

Slices.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
};

export default Slices;
