import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

export default function({ fields, onSubmit }) {
    const [ state, setState ] = useState(); //initialize form state for field storage
    const [ isError, setIsError ] = useState(false);
    
    const keys = useRef([]);

    useEffect(() => { //generate state object on component mounting
        let newState = {};
        keys.current = Object.keys(fields);
        keys.current.map(key => { //iterate through keys and create initial state values
            newState = {
                ...newState, //use spread operator to retain previous elements added to object
                [key]: { value: '', error: '' }
            }
        });
        setState(newState); //update state with initial values of input
    }, [ ])

    return (
        <View style={styles.container}>
            {  keys.current.length > 0 && //iterate and create inputs
                keys.current.map(key => {
                    return (<View key={key} 
                                  style={styles.inputContainer}>
                                <Text style={styles.label}>{fields[key].label || ''}:</Text>
                                <TextInput  style={styles.input}
                                            onChangeText={(value) => {
                                                let error = false;
                                                setIsError(false);
                                                fields[key].validators.map(validator => {
                                                    error = validator(value) || error; //set error value if validator returns false (validator should return string if error is found, false if not)
                                                    if (error) setIsError(true)
                                                });
                                                setState({ ...state, [key]: { value, error }}); //update state with new values
                                            }}
                                            value={state[key].value} 
                                            placeholder={fields[key].required ? "required" : "optional"}                                           
                                            {...fields[key].props} />
                                <Text style={styles.errorText}>{state[key].error /* display error message if one is found */}</Text>
                            </View>)
                })
            }
            <Button style={styles.button}
                    title="Submit"
                    onPress={() => {
                        for (const [key, value] of Object.entries(state)) { 
                            if (fields[key].required && value.value === "") { //verify all required fields have a value
                                value.error = "field required";
                                setIsError(true);
                                return;
                            }
                            if (value.error === "" || value.error) { //check if error is present or if field has been validated yet
                                if (fields[key].validators.length > 0) { //if no validation is required, skip validation for field
                                    fields[key].validators.map(validator => value.error = validator(value.value)); //validate field and set error message
                                    setIsError(true); //update isError and re-render
                                    return;
                                }
                            }
                        }
                        onSubmit(state); /** pass state to submit handler */
                    }} 
                    disabled={isError} />
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
    label: {
        paddingBottom: 5
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
        backgroundColor: "#fff"
    }
})
