# @snskar125/rn-picker

Picker Component for React Native

## Usage

```javascript
import Picker from "@snskar125/rn-picker";
import { Button } from "react-native";
import { useState } from "react";
export default function App() {
  const [value, setValue] = useState(null);
  return (
    <Picker
      items={[
        { label: "Label 1", value: 1 },
        { label: "Label 2", value: 2 },
        { label: "Label 3", value: 3 },
        { label: "Label 4", value: 4 },
        { label: "Label 5", value: 5 },
      ]}
      value={value}
      onSelect={({ value }) => {
        setValue(value);
      }}
    />
  );
}
```

## Props

| Prop                        | Type                                          |
| --------------------------- | --------------------------------------------- |
| searchable                  | Boolean                                       |
| cancelable                  | Boolean                                       |
| value                       | Any                                           |
| items                       | Array of Objects (Label, Value)               |
| RenderButton                | Component (Don't wrap in Touchable Component) |
| placeholder                 | String                                        |
| onSelect                    | Function                                      |
| backgroundColor             | String                                        |
| selectedItemBackgroundColor | String                                        |
| textColor                   | String                                        |
| selectedItemTextColor       | String                                        |
| inputStyle                  | TextInput Style                               |
| cancelButtonStyle           | TouchableOpacity Style                        |
| cancelTextStyle             | Text Style                                    |

## Methods

showPicker()<br>
hidePicker()
