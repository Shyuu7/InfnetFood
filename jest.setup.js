import 'react-native-gesture-handler/jestSetup';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('./contexts/ThemeContext', () => ({
  ThemeContext: {
    Provider: ({ children }) => children,
  },
  useTheme: () => ({
    isDark: true,
    colors: {
      containerBg: '#0C0C0D',
      textColor: '#ffffff',
      accent: '#A87B03'
    }
  })
}));