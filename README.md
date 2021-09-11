# [Nomad Dsgns](https://www.nomaddsgns.com) Custom Form with input validation
React Native Custom Form Component with input validation

## Instructions for Use ##
1. Clone Component to project:
    - Command Line: git clone https://github.com/NomadDsgns/nomad-react-native-form.git
    -or- Copy and paste code into new file
2. Import into file where it's to be used in the project:
    - Add to top of file where component will be used: import NomadForm from './NomadForm.js
3. Add component into project code and pass in required/desired props:
    - fields (required): an object of elements that contain form input data (example below)
    - onSubmit (required): Function to be passed for handling submission, recieves an object containing values of inputs as parameter (example below)


### Fields object to be passed ###
The fields object must be an object containing each input element with all the required information, with the a unique key name:

validators (required): Array of validator functions. See [Validators](https://github.com/NomadDsgns/nomad-react-native-form/blob/main/README.md#validators) section for more information.
label (optional): A label for the input field
props (required): list of props to be passed to the input field, pass empty object if no props are needed. [Click here](https://reactnative.dev/docs/textinput) for a more information on props that can be passed to input fields in react native

Example:
```
{
    email: {  
        validators: [validateLength, validateEmail],
        label: 'E-mail',
        props: {
            placeholder: "required"   
        }
    },
    password: {
        validators: [validateLength, validateHasNumber],
        label: 'password',
        props: {
            secureEntry: true,
            placeholder: "required"
        }
    }
}
```

### Validators ###

Validator functions take the value as an input and returns an error string, or `FALSE` if no errors are found.
Example of a validator that returns error if input value is less than 5 characters long:
```
const validateLength = (value) => (value?.length < 5 ? 'Value must be greater than 5 characters` : FALSE)
```
