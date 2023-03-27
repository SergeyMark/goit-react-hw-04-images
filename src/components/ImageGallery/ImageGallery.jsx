import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ imageCardsArray, onImgClick }) => {
  return (
    <ul className={css.imageGallery}>
      {imageCardsArray.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          imgId={id}
          image={webformatURL}
          tags={tags}
          onImgClick={onImgClick}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  imageCardsArray: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  onImgClick: PropTypes.func.isRequired,
};