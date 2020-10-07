import React from 'react';
import { PageHeader, Descriptions, Typography, Image, Button } from 'antd';
import ContentEditable from 'react-contenteditable';

const { Title } = Typography;

function RecipeDetail({ recipe, onBack, onEdit, onDelete }) {
  return (
    <div className="Container">
      <PageHeader
        ghost={false}
        onBack={onBack}
        title={recipe.name}
        extra={[
          <Button onClick={onDelete} key={`delete-${recipe.id}`} type="danger">
            delete
          </Button>
        ]}
      >
        <div style={{maxWidth:"50%", margin: "0 auto"}}>
          <Image width={{width: "100%",}} src={recipe.imageUrl} />
        </div>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Meal type">{recipe.mealType}</Descriptions.Item>
          <Descriptions.Item label="Number of people">{recipe.numberOfPeople}</Descriptions.Item>
          <Descriptions.Item label="Difficulty level">{recipe.difficultyLevel}</Descriptions.Item>
        </Descriptions>
        <Title level={4}>Ingredients</Title>
        <ContentEditable
          html={recipe.ingredients}
          data-field="ingredients"
          className="content-editable"
          onChange={onEdit}
        />
        <Title level={4}>Instructions</Title>
        <ContentEditable
          html={recipe.instructions}
          data-field="instructions"
          className="content-editable"
          onChange={onEdit}
        />
      </PageHeader>
    </div>
  )
}

export default RecipeDetail;
