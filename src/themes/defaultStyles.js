// themes/defaultStyles.js
import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C853', // Green
    marginBottom: 20,
  },

  buttons: {
    width: '100%',
    marginTop: 10,
  },

  button: {
    marginVertical: 10,
    backgroundColor: '#00C853', // Green
  },

  outlinedButton: {
    marginVertical: 10,
    borderColor: '#1A237E', // Deep Blue
    borderWidth: 1,
  },

  input: {
    width: '100%',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666', // Medium gray text color
  },

  form: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default defaultStyles;
