// import React from 'react';
// import PropTypes from 'prop-types';
// import iconShare from '../images/shareIcon.svg';
// import iconFavorite from '../images/whiteHeartIcon.svg';

// export default function RecipeInProgress({ match }) {
//   const { params: { id } } = match;
//   const { path } = match;

//   return (
//     <div>
//       <h1
//         data-testid="recipe-title"
//       >
//         {title}
//       </h1>
//       <img
//         data-testid="recipe-photo"
//         src={ image }
//         alt="imageRecipe"
//       />
//       <button
//         data-testid="share-btn"
//         onClick={ () => console.log('botão share') }
//       >
//         <img
//           className="icons"
//           src={ iconShare }
//           alt="shareIcon"
//         />
//       </button>
//       <button
//         data-testid="favorite-btn"
//         onClick={ () => console.log('botão favoritar') }
//       >
//         <img
//           className="icons"
//           src={ iconFavorite }
//           alt="iconFavorite"
//         />
//       </button>
//       <p
//         data-testid="recipe-category"
//       >
//         {category}
//       </p>
//       <p
//         data-testid="instructions"
//       >
//         Modo de preparo:
//         <br />
//         {`${instruction}`}
//       </p>
//       <button
//         data-testid="finish-recipe-btn"
//       >
//         Finalizar receita
//         {' '}

//       </button>
//     </div>
//   );
// }

// RecipeInProgress.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   }),
// }.isRequired;
