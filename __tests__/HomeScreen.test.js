import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { categories } from '../constants/Categories';

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todas as categorias', () => {
    const { getByText } = render(<HomeScreen />);
    
    categories.forEach(category => {
      expect(getByText(category.title)).toBeTruthy();
    });
  });

  it('deve navegar para os produtos daquela categoria quando a categoria for selecionada', () => {
    const { getByText } = render(<HomeScreen />);
    const firstCategory = categories[0];
    fireEvent.press(getByText(firstCategory.title));

    const mockNavigation = require('@react-navigation/native').useNavigation();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Products', {
      categoryId: firstCategory.id,
      categoryTitle: firstCategory.title
    });
  });
});