// themes/defaultStyles.js
import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
  // Screen related default styles
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  contentContainer: {
    flexGrow: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 20,
  },

  screenContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  subScreenContainer: {
    paddingHorizontal: 10,
  },

  // Form related default styles
  form: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default defaultStyles;
