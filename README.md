# react-native-redux-boot
> Redux app boot for react native.


## options:
| name | type | value | description |
| :----| :----| :----| :----|
| root  | ReactInstnace | null | Your root element(react element) of the application |
| memory  | Object | {} | Application memory data storage |
| request  | Object | {} | Application request data |

## usage:
+ index.ios.js
```jsx harmony
import {Alert} from 'react-native';
import {ReduxBoot} from 'react-native-redux-boot';
import App from './app/index';

ReduxBoot.run(App, 'RnRedux');
```

+ app/index.js
```jsx harmony
import {ReduxAppBase} from 'react-native-redux-boot';
import Main from './main';
import {View} from 'react-native';
import React from 'react';

export default class extends ReduxAppBase {

    static initialState() {
        return {
            memory: {
                test: 100,
                initialData: {
                    tes: 123,
                    age: 100,
                    items: []
                },
                myInitial: 0,
                sum: 0
            }
        }
    }

    render() {
        return (
            <View>
                <Main />
            </View>
        )
    }
}
```
+ app/main.js
```jsx harmony
import {ReduxAppBase} from 'react-native-redux-boot';
import {View, ScrollView, Text, Button, Alert} from 'react-native';
import React from 'react';

export default class extends React.Component {

    _onClick = e => {
        let {test, initialData} = ReduxAppBase.$.memory;
        test++;
        initialData.tes = initialData.tes + 's';
        ReduxAppBase.$.memory = {test: test};
    };

    render() {
        const {test, initialData} = ReduxAppBase.$.memory;
        return (
            <View style={{marginTop: 40}}>
                <Text>member-list.1212... {test}</Text>
                <Text style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    padding: 20,
                    margin:20,
                    backgroundColor: '#eee',
                    color: '#333'
                }}>{
                    JSON.stringify(initialData, null, 4)
                }</Text>
                <Text>Age:{initialData.age}</Text>
                <Button title="Test button" onPress={this._onClick}/>
            </View>
        );
    }
}
```

## resources:
+ https://github.com/afeiship/rn-module-redux