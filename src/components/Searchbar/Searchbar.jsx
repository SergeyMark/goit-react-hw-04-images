import { useState } from "react";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({onSubmit}) => {
  const [ inputValue, setInputValue ] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  }

  const handleSubmit = event => {
      event.preventDefault();
      if (inputValue.trim() === '') {
        Notify.warning('Opss...try again');
        return;
      }
      onSubmit(inputValue);
      setInputValue('');
  }

  return (
          <header className={css.header}>
            <form className={css.form} onSubmit={handleSubmit}>
              <button className={css.buttonForm} type="submit">
                <span>Search</span>
              </button>
    
              <input
                className={css.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images"
                value={inputValue}
                onChange={handleChange}
              />
            </form>
          </header>
        );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};






// export class Searchbar extends Component {
//   state = { inputValue: '' };

//   handleChange = event => {
//     this.setState({ inputValue: event.target.value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.inputValue.trim() === '') {
//       Notify.warning('Opss...try again');
//       return;
//     }
//     this.props.onSubmit(this.state.inputValue);
//     this.setState({ inputValue: '' });
//   };

//   render() {
//     return (
//       <header className={css.header}>
//         <form className={css.form} onSubmit={this.handleSubmit}>
//           <button className={css.buttonForm} type="submit">
//             <span>Search</span>
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images"
//             value={this.state.inputValue}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };