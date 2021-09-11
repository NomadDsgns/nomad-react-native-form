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


### fields object to be passed ###

`
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
`