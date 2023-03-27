import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imgId, image, tags, onImgClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={image}
        alt={tags}
        onClick={() => onImgClick(imgId)}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  imgId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};