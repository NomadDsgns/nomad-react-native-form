import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

export default function({ fields, onSubmit }) {
    const [ state, setState ] = useState({}); //initialize form state for field storage
    const keys = useRef(Object.keys(fields)); //create array of keys to iterate through


    useEffect(() => {
        let newState = {};
        keys.map(key => { //iterate through keys and create initial state values
            newState = {
                ...newState,
                [key]: { value: '', error: '' }
            }
        });
        setState(newState);
    }, [])

    return (
        <View style={styles.container}>
            { //iterate and create inputs 
                keys.map(key => {
                    <View style={styles.inputContainer}>
                        <TextInput  key={key}
                                    style={styles.input}
                                    onChangeText={(value) => {
                                        
                                    }}
                                    value={state[key].value}
                                    {...fields[key].props} />
                        <Text style={styles.errorText}>{state[key].error}</Text>
                    </View>
                })
            }
            <Button style={styles.button}
                    title="submit"
                    onPress={onSubmit} />
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
        },
        password: {
            validators: [validateLength, validateHasNumber],
            label: 'password',
            props: {
                secureEntry: true
            }
        }
    }
*/