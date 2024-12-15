import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { COLORS } from '../constants/Colors';
import { mockUser } from '../constants/mockUser';

const LoginScreen = ({ route }) => {
  const { setIsAuthenticated } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    if (!email.includes('@')) {
      setError('Email inválido');
      return;
    }
    if (email === mockUser.email && password === mockUser.password) {
      setIsAuthenticated(true);
    } else {
      setError('Email ou senha inválidos');
    }
  };
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/InfnetFood-no-bg.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.darkGray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={COLORS.darkGray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkRed,
    padding: 20,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },

  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.goldenYellow,
    backgroundColor: COLORS.white,
    color: COLORS.darkGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.goldenYellow,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  errorText: {
    color: COLORS.red,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;