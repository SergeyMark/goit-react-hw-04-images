import { useState, useEffect } from "react";

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { FetchApi } from './API/api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [imageCards, setImageCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImgCard, setSelectedImgCard] = useState();

  useEffect(()=>{
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    setTotalHits(0);

    FetchApi(searchQuery, page).then(resp => {
      if (resp.data.hits.length === 0) {
        setLoading(false);
        Notify.warning('Oops! Find better)');
        return;
      }

      setImageCard(prevImageCards => [...prevImageCards, ...resp.data.hits]);
      setTotalHits(resp.data.totalHits);
    }).catch(
      error => {
        console.log(error);
        Notify.failure('Something went wrong...');
        setLoading(false);
        }
    ).finally(()=> setLoading(false)

    );
  }, [page, searchQuery]);

  const onSubmit = inputValue => {
    if (searchQuery !== inputValue) {
        setSearchQuery(inputValue);
        setImageCard([]);
        setPage(1);
    }
  }

  const onImgClick = imgId => {
    const imageCard = imageCards.find(imageCard => imageCard.id === imgId);
    setSelectedImgCard(imageCard);
    setShowModal(true);
  }

  const toggleModal = () => {
    setShowModal(showModal => !showModal)
  }

  const onLoadBtnClick = () => {
    setPage(page => page + 1);
  }

  return (
          <div >
            <Searchbar onSubmit={onSubmit} />
    
            {imageCards.length > 0 && (
              <ImageGallery imageCardsArray={imageCards} onImgClick={onImgClick} />
            )}
    
            {showModal && (
              <Modal onClose={toggleModal} selectedImgCard={selectedImgCard} />
            )}
    
            {loading && <Loader />}
    
            {(page * 12 <= totalHits) && <Button onClick={onLoadBtnClick} />}
          </div>
        );

}






// export class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     totalHits: 0,
//     imageCards: [],
//     loading: false,
//     showModal: false,
//     selectedImgCard: undefined,
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       this.state.searchQuery !== prevState.searchQuery ||
//       this.state.page !== prevState.page
//     ) {
//       const { searchQuery, page } = this.state;

//       this.setState({ loading: true, totalHits: 0 });

//       const fetchResponse = FetchApi(searchQuery, page);
//       fetchResponse
//         .then(resp => {
//           console.log(resp)
//           if (resp.data.hits.length === 0) {
//             this.setState({ loading: false });
//             Notify.warning('Oops! Find better)');
//             return;
//           }

//           this.setState(() => ({
//             imageCards: [...this.state.imageCards, ...resp.data.hits],
//             totalHits: resp.data.totalHits,
//           }));

//           if (resp.data.total === 0) {
//             Notify.warning('Sorry, there are no images matching your search query. Please try again.');
//           }
//         })
//         .catch(error => {
//           console.log(error);
//           Notify.failure('Something went wrong...');
//           this.setState({ loading: false });
//         })
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   onSubmit = inputValue => {
//     if (this.state.searchQuery !== inputValue) {
//       this.setState({ searchQuery: inputValue, imageCards: [], page: 1 });
//     }
//   };

//   onLoadBtnClick = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   onImgClick = imgId => {
//     const imageCard = this.state.imageCards.find(
//       imageCard => imageCard.id === imgId
//     );

//     this.setState({ selectedImgCard: imageCard, showModal: true });
//   };

//   render() {
//     const { imageCards, loading, totalHits, showModal, selectedImgCard, page } =
//       this.state;

//     return (
//       <div >
//         <Searchbar onSubmit={this.onSubmit} />

//         {imageCards.length > 0 && (
//           <ImageGallery imageCardsArray={imageCards} onImgClick={this.onImgClick} />
//         )}

//         {showModal && (
//           <Modal onClose={this.toggleModal} selectedImgCard={selectedImgCard} />
//         )}

//         {loading && <Loader />}

//         {(page * 12 <= totalHits) && <Button onClick={this.onLoadBtnClick} />}

//         {/* {totalHits > 12 && <Button onClick={this.onLoadBtnClick} />} */}
//       </div>
//     );
//   }
// }