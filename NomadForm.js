import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function({ fields, onSubmit }) {
    const [ state, setState ] = useState({}); //initialize form state for field storage
    const [ isError, setIsError ] = useState(false);

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
                                <Text style={styles.label}>{fields[key].label || ''}</Text>
                                <TextInput  key={key} 
                                            style={styles.input}
                                            onChangeText={(value) => {
                                                let error = false;
                                                setIsError(false)
                                                fields[key].validators.map(validator => {
                                                    error = validator(value); //set error value if validator returns false (validator should return string if error is found, false if not)
                                                    setIsError(true);
                                                    if (error) break; //breaks out of loop upon first error
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
                    onPress={() => onSubmit(state)} /** pass state to submit handler */
                    disabled={!isError} />
            <Text style={styles.errorText}>{isError ? `Please resolve errors before submitting` : ``}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10
    },
    inputContainer: {
        marginBottom: 20,
        shadowColor: '#0043ad',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    input: {
        height: 40,
        width: 300,
        paddingHorizontal: 5,
        backgroundColor: 'white',
    },
    errorText: {
        paddingTop: 10,
        color: "red",
        textAlign: 'center',
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