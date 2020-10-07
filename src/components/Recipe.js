import React from 'react';
import { Card } from 'antd';

function Recipe({ recipe, onRecipeSelect }) {
  return (
    <Card
      hoverable
      onClick={() => onRecipeSelect(recipe)}
      style={{ 
        marginTop: "10px"
      }}
      cover={
        <img
          alt=""
          src={recipe.imageUrl}
        />
      }
    >
      <Card.Meta
        title={recipe.name}
      />
    </Card>
  )
}

export default Recipe;
