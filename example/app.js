import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';

import EyeIcon from './assets/eye.png';
import InvisibleEyeIcon from './assets/invisible.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitAbout = this.onSubmitAbout.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);

    this.firstnameRef = this.updateRef.bind(this, 'firstname');
    this.lastnameRef = this.updateRef.bind(this, 'lastname');
    this.aboutRef = this.updateRef.bind(this, 'about');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.houseRef = this.updateRef.bind(this, 'house');

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      secureTextEntry: true,
      ...defaults,
    };
  }

  onFocus() {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  onChangeText(text) {
    ['firstname', 'lastname', 'about', 'email', 'password']
      .map(name => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  }

  onSubmitFirstName() {
    this.lastname.focus();
  }

  onSubmitLastName() {
    this.about.focus();
  }

  onSubmitAbout() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onSubmit() {
    let errors = {};

    ['firstname', 'lastname', 'email', 'password'].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
        if (name === 'password' && value.length < 6) {
          errors[name] = 'Too short';
        }
      }
    });

    this.setState({errors});
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  renderPasswordAccessory() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          this.setState(({secureTextEntry}) => ({
            secureTextEntry: !secureTextEntry,
          }))
        }>
        <Image
          style={styles.passwordAccessory}
          source={this.state.secureTextEntry ? InvisibleEyeIcon : EyeIcon}
        />
      </TouchableOpacity>
    );
  }

  render() {
    let {errors = {}, secureTextEntry, ...data} = this.state;
    let {firstname, lastname, about} = data;

    let defaultEmail = `${firstname || 'name'}@${lastname || 'house'}.dev`
      .replace(/\s+/g, '_')
      .toLowerCase();

    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <TextField
              ref={this.firstnameRef}
              value={firstname}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitFirstName}
              returnKeyType="next"
              label="First Name"
              error={errors.firstname}
            />

            <TextField
              ref={this.lastnameRef}
              value={lastname}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitLastName}
              returnKeyType="next"
              label="Last Name"
              error={errors.lastname}
            />

            <TextField
              ref={this.aboutRef}
              value={about}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitAbout}
              returnKeyType="next"
              multiline={true}
              blurOnSubmit={true}
              label="About (optional)"
              characterRestriction={140}
            />

            <TextField
              ref={this.emailRef}
              defaultValue={defaultEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitEmail}
              returnKeyType="next"
              label="Email Address"
              error={errors.email}
            />

            <TextField
              ref={this.passwordRef}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              clearTextOnFocus={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPassword}
              returnKeyType="done"
              label="Password"
              error={errors.password}
              title="Choose wisely"
              maxLength={30}
              characterRestriction={20}
              renderRightAccessory={this.renderPasswordAccessory}
            />

            <TextField
              ref={this.houseRef}
              defaultValue={data.lastname}
              label="House"
              title="Derived from last name"
              disabled={true}
            />
          </View>
          <TextField
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            textColor="#141414"
            tintColor="#696969"
            baseColor="#696969"
            labelFontSize={14}
            inputContainerStyle={styles.emailInputStyle}
            activeLineWidth={1}
            value={defaultEmail}
            onChangeText={this.onChangeText}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;

const defaults = {
  firstname: 'Gabriel',
  lastname: 'Donadel',
  about:
    'Brazilian Software Engineer passionate about tinkering and making my ideas become reality',
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'transparent',
  },
  container: {
    margin: 8,
    marginTop: Platform.select({ios: 8, android: 32}),
    flex: 1,
  },
  contentContainer: {
    padding: 8,
  },
  buttonContainer: {
    paddingTop: 8,
    margin: 8,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  passwordAccessory: {
    height: 18,
    width: 18,
    tintColor: 'gray',
  },
});
