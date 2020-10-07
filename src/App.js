import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import './App.css';


const initialState = {
  recipes: [],
  selectedRecipeIndex: null,
  form: {
    name: '',
    mealType: '',
    imageUrl: '',
    numberOfPeople: 0,
    difficultyLevel: '',
    ingredients: '',
    instructions: '',
  },
  addRecipeMode: false,
}


function reducer(state, action) {
  switch(action.type) {
    case 'SET_RECIPES': {
      return {
        ...state,
        recipes: action.recipes,
      }
    }
    case 'DELETE_RECIPE': {
      const { recipes, selectedRecipeIndex } = state;
      return {
        ...state,
        recipes: [
          ...recipes.slice(0, selectedRecipeIndex),
          ...recipes.slice(selectedRecipeIndex + 1)
        ],
        selectedRecipeIndex: null,
      }
    }
    case 'RECIPE_EDIT': {
      const { recipes, selectedRecipeIndex } = state;
      return {
        ...state,
        recipes: [
          ...recipes.slice(0, selectedRecipeIndex),
          {
            ...recipes[selectedRecipeIndex],
            [action.field]: action.value,
          },
          ...recipes.slice(selectedRecipeIndex + 1),
        ],
      }
    }
    case 'BACK_HOME':
      return {
        ...state,
        addRecipeMode: false,
      }
    case 'ADD_RECIPE_MODE':
      return {
        ...state,
        addRecipeMode: true
      }
    case 'INPUT_CHANGE':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        },
      }
    case 'VALUE_CHANGE':
      return {
        ...state,
        form: {
          ...state.form,
          [action.property]: action.value
        }
      }
    case 'FORM_SUBMIT':
      return {
        ...state,
        recipes: [
          ...state.recipes,
          {...state.form, id: uuid()}
        ],
        form: {
          ...initialState.form
        },
        addRecipeMode: false,
      }
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedRecipeIndex: null
      }
    case 'SELECT_RECIPE':
      return {
        ...state,
        selectedRecipeIndex: state.recipes.findIndex(r => r.id === action.id)
      }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let recipes = JSON.parse(localStorage.getItem('recipes')) ||  [{
      id: uuid(),
      name: 'Salmon & spinach with tartare cream',
      imageUrl: "https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg",
      mealType: 'lunch',
      numberOfPeople: 3,
      difficultyLevel: 'intermadiate',
      ingredients: "1 tsp sunflower or vegetable oil\n\n 2 skinless salmon fillet\n\n 250g bag spinach\n\n 2 tbsp reduced-fat crème fraîche\n\njuice ½ lemon\n\n 1 tsp caper, \n\n 2 tbsp flat-leaf parsley, chopped\n\nlemon wedges, to serve",
      instructions: "1. Heat the oil in a pan, season the salmon on both sides, then fry for 4 mins each side until golden and the flesh flakes easily. Leave to rest on a plate while you cook the spinach.\n\n2. Tip the leaves into the hot pan, season well, then cover and leave to wilt for 1 min, stirring once or twice. Spoon the spinach onto plates, then top with the salmon. Gently heat the crème fraîche in the pan with a squeeze of the lemon juice, the capers and parsley, then season to taste. Be careful not to let it boil. Spoon the sauce over the fish, then serve with lemon wedges.",
    },
    {
      id: uuid(),
      name: "Spicy black bean tacos",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
      mealType: 'breakfast',
      numberOfPeople: 1,
      difficultyLevel: 'easy',
      ingredients: "1 tbsp vegetable oil\n\n3 garlic cloves, chopped\n\n3 x 400g cans black beans, drained and rinsed\n\n3 tbsp cider vinegar\n\n1 ½ tbsp honey\n\n1 ½ tbsp smoked paprika\n\n1 ½ tbsp ground cumin\n\n1 small garlic clove\n\n2 tbsp roughly chopped coriander\n\n1 green chilli, sliced\n\n2 avocados, halved and stoned\n\njuice 1 lime\n\n110g pack pomegranate seeds\n\n1 green chilli, finely diced\n\n1 small white onion, finely diced\n\nsmall handful fresh coriander, chopped",
      instructions: "1. In a large frying pan, heat the oil and add the garlic. Fry until golden, then add the beans. Pour in the cider vinegar, honey and spices along with 1 tsp or more of salt, to taste. Cook until warmed through, crushing gently with the back of your wooden spoon, then set aside.\n\n2. The best way to make the guacamole is with a large stone pestle and mortar, but you can use a medium bowl and a flat-ended rolling pin instead. Crush the garlic, coriander and chilli into a rough paste. Scoop in the avocado with a little salt and crush roughly – you want it chunky, not smooth. Squeeze in the lime juice and set aside.\n\n3. Mix the salsa ingredients in a small bowl. Heat a griddle pan or steamer and quickly griddle the tortillas or steam a stack of them to warm up. Reheat the bean mixture.\n\n4. To serve, put 1-2 heaped tbsp of beans on a tortilla. Top with a big spoonful of guacamole and some salsa, hot sauce and a dollop of soured cream or yogurt.",
    }];
    dispatch({ type: 'SET_RECIPES', recipes });
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(state.recipes));
  }, [state.recipes])

  function onRecipeSelect(recipe) {
    dispatch({ type: 'SELECT_RECIPE', id: recipe.id });
  }
  function clearSelection() {
    dispatch({ type: 'CLEAR_SELECTION'});
  }
  function onInputChange(e) {
    dispatch({ type: 'INPUT_CHANGE', field: e.target.name, value: e.target.value });
  }
  function onValueChange(value, property) {
    dispatch({ type: 'VALUE_CHANGE', value, property})
  }
  function onFormSubmit() {
    dispatch({ type: 'FORM_SUBMIT' });
  }
  function onEdit(e) {
    const {
      currentTarget: {
        dataset: { field }
      },
      target: { value }
    } = e;

    dispatch({ type: 'RECIPE_EDIT', field, value});
  }

  if (state.selectedRecipeIndex !== null) {
    return <RecipeDetail 
      onEdit={onEdit} 
      onDelete={() => dispatch({ type: 'DELETE_RECIPE' })} 
      onBack={clearSelection} 
      recipe={state.recipes[state.selectedRecipeIndex]} 
    />
  }
  return (
    <div className="Container">
      <Header 
        addRecipeMode={state.addRecipeMode} 
        onBack={() => dispatch({ type: 'BACK_HOME' })}
        onAddRecipe={() => dispatch({ type: 'ADD_RECIPE_MODE' })} 
      />
      {
        state.addRecipeMode ? 
          <RecipeForm 
            data={state.form} 
            onValueChange={onValueChange} 
            onInputChange={onInputChange} 
            onFormSubmit={onFormSubmit} 
          />
          :
          <RecipeList 
            onRecipeSelect={onRecipeSelect} 
            recipes={state.recipes} 
          />
      }
    </div>
  );
}

export default App;
