import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function({ fields, buttons }) {
    const [ state, setState ] = useState(); //initialize form state for field storage
    const [ isError, setIsError ] = useState(false);
    
    const keys = useRef([]);
    const buttonKeys = useRef(Object.keys((buttons || [])) || []);

    useEffect(() => { //generate state object on component mounting
        let newState = {};
        keys.current = Object.keys(fields);
        keys.current.map(key => { //iterate through keys and create initial state values
            newState = {
                ...newState, //use spread operator to retain previous elements added to object
                [key]: { value: fields[key].value || '', error: '' }
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
                                <Text style={styles.label}>{fields[key].label ? `${fields[key].label}:` : ''}</Text>
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
                                            placeholder={fields[key].required ? "required" : ""}
                                            autoCapitalize="none"                                           
                                            {...fields[key].props} />
                                <Text style={styles.errorText}>{state[key].error /* display error message if one is found */}</Text>
                            </View>)
                })
            }
            <View style={styles.buttonContainer}>
                {buttonKeys.current.map(key => {
                    return (
                        <TouchableOpacity key={key} 
                            style={isError ? styles.buttonDisabled : styles.button}
                            onPress={() => {
                                if (buttons[key].omitValidation) return buttons[key].action(state); /** pass state to button handler */
                                for (const [key, value] of Object.entries(state)) { 
                                    if (fields[key].required && value.value === "") { //verify all required fields have a value
                                        value.error = "field required";
                                        setIsError(true);
                                        return;
                                    }
                                    if (value.error || value.error === '') { //check if error is present or if field has been validated yet
                                        if (fields[key].validators.length > 0) { //if no validation is required, skip validation for field
                                            let error = false;
                                            fields[key].validators.map(validator => {
                                                value.error = validator(value.value);
                                                if (value.error) error = true;
                                            }); //validate field and set error message
                                            if (error) {
                                                setIsError(true);
                                                return;
                                            }
                                        }
                                    }
                                }
                                if (!isError) buttons[key].action(state); /** pass state to button handler */
                            }} 
                            disabled={isError}>
                                <Text style={ isError ? styles.buttonTextDisabled : styles.buttonText}>{buttons[key].text}</Text>
                        </TouchableOpacity>
                    );
                })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        paddingBottom: 5
    },  
    input: {
        height: 40,
        width: 300,
        paddingHorizontal: 5,
        backgroundColor: '#f7f7f7',
        borderColor: "#c4c4c4",
        borderWidth: 1,
    },
    errorText: {
        paddingTop: 10,
        color: "red",
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    button: {
        backgroundColor: "#0065a3",
        borderWidth: 1,
        borderColor: "#007bff",
        alignSelf: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 43,
        paddingRight: 43,
    },
    buttonDisabled: {
        backgroundColor: "#afb0b3",
        borderWidth: 1,
        borderColor: "#fff",
        alignSelf: "center",
        alignItems: "center"
    },
    buttonTextDisabled: {
        color: "#000",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 43,
        paddingRight: 43,
    }
})