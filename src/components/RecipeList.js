import React from 'react';
import { Col, Row } from 'antd';
import { v4 as uuid } from 'uuid';
import Recipe from './Recipe'

function RecipeList({ recipes, onRecipeSelect }) {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {
        recipes.map(r => (
          <Col key={uuid()} span={8}>
            <Recipe onRecipeSelect={onRecipeSelect} recipe={r} />
          </Col>
        ))
      }
    </Row>
  )
}

export default RecipeList;
