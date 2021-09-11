import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

export default function({ fields, onSubmit }) {
    const [ state, setState ] = useState({}); //initialize form state for field storage
    const keys = useRef(Object.keys(fields)); //create array of keys to iterate through


    useEffect(() => { //generate state object on component mounting
        let newState = {};
        keys.map(key => { //iterate through keys and create initial state values
            newState = {
                ...newState, //use spread operator to retain previous elements added to object
                [key]: { value: '', error: '' }
            }
        });
        setState(newState); //update state with initial values of input
    }, [])

    return (
        <View style={styles.container}>
            { //iterate and create inputs 
                keys.map(key => {
                    return (<View style={styles.inputContainer}>
                                <TextInput  key={key} 
                                            style={styles.input}
                                            onChangeText={(value) => {
                                                let error = ''; //resets error message on each text change
                                                fields[key].validators.map(validator => {
                                                    error = validator(value) || error; //set error value if validator returns false (validator should return string if error is found, false if not)
                                                });
                                                setState({ ...state, [key]: { value, error }}); //update state with new values
                                            }}
                                            value={state[key].value}                                            
                                            {...fields[key].props} />
                                <Text style={styles.errorText}>{state[key].error /* display error message if one is found */}</Text>
                            </View>)
                })
            }
            <Button style={styles.button}
                    title="Submit"
                    onPress={() => onSubmit(state)} /** pass state to submit handler */ />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    inputContainer: {

    },
    input: {

    },
    errorText: {
        
    },
    button: {

    }
})

/*
    example fields object:

    fields: {
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
*/