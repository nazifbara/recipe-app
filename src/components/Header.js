import React from 'react';
import { PageHeader, Button } from 'antd';
import { v4 as uuid } from 'uuid';

function Header({ addRecipeMode, onAddRecipe, onBack }) {
  return (
    <div className="Header">
      <PageHeader
        style={{
          borderBottom: "1px solid black",
          marginBottom: "10px",
        }}
        onBack={addRecipeMode ? onBack : null}
        ghost={false}
        title="GoodRecipe"
        extra={[
          <Button 
            key={uuid()}
            type="primary"
            onClick={onAddRecipe}
          >
              Add recipe
          </Button>,
        ]}
      />
    </div>
  )
}

export default Header;
