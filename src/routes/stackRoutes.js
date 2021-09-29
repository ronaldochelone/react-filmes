import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import { Title } from "../pages/Detail/styles";

const Stack = createNativeStackNavigator();

function StackRoutes () {
    return(
       <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options ={{
                    headerShown: false
                }}

            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options ={{
                    headerShown: false,
                    Title: 'Detalhes'
                }}
            />

        </Stack.Navigator>

        


    )
}

export default StackRoutes;