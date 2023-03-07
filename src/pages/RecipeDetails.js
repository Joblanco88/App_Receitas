import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetails({ match }) {
  useEffect(() => {
    const { params: { id } } = match;
  }, [match]);
  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
