
import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
           title: 'Breast Tissue Clinical Trial',
           headerStyle: [
                backgroundColor: '#333333',
           },
           headerTintColor: '#fff',
           headerTitleStyle: {
             fontWeight: 'bold',
           },
        }}
      />
    </Stack.Navigator>
  );
}

export default withRouter(Navigation);
