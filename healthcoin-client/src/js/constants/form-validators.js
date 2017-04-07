const email = {
  'message': 'Please enter a valid email',
  'isValid': (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

const password = {
  'message': 'Password should be at least 6 characters',
  'isValid': password => {
    return password && password.length > 5
  }
}

const notEmpty = fieldName => {
  return {
    'message': `The field "${fieldName}" cannot be empty`,
    'isValid': value => {
      return !!value
    }
  }
}

const isInt = (fieldName) => {
  return {
    'message': `The field "${fieldName}" should be an Integer`,
    'isValid': value => {
      var x;
      if (isNaN(value)) {
        return false;
      }
      x = parseFloat(value);
      return (x | 0) === x;
    }
  }
}

export const SIGN_IN_VALIDATORS = {
  'email': email,
  'password': password
}

export const SIGN_UP_VALIDATORS = {
  'firstname': notEmpty('First Name'),
  'lastname': notEmpty('Last Name'),
  'email': email,
  'password': password,
  'passwordAgain': password
}

export const INIT_PROFILE_VALIDATORS = {
  'weight': isInt('weight'),
  'height': notEmpty('height')
}
