import React, { Component } from 'react'
import {firebaseAuth} from "../../../../../../dbInfo/firebase"

export const login = async (email:string, password:string, history:string="/") => {
    try {
        await firebaseAuth.auth().signInWithEmailAndPassword(email, password);
        // history.push("/");
    } catch (error) {
        alert(error);
    }
};
