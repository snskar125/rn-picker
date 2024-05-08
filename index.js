import { Fragment, PureComponent } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
class DefaultButton extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text
        style={styles.defaultButtonStyle}
      >{`${this.props.label}    ⋮`}</Text>
    );
  }
}
class PickerItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      label,
      value,
      handleSelect,
      isSelected,
      backgroundColor,
      textColor,
      selectedItemBackgroundColor,
      selectedItemTextColor,
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.pickerItemContainer,
          {
            backgroundColor: isSelected
              ? selectedItemBackgroundColor
              : backgroundColor,
          },
        ]}
        onPress={() => {
          handleSelect({ label, value });
        }}
        activeOpacity={0.75}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.pickerItem,
            {
              color: isSelected ? selectedItemTextColor : textColor,
              fontWeight: isSelected ? "bold" : "normal",
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}
export default class Picker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      search: "",
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleSelect = (option) => {
    this.setState({ visible: false });
    this.props.onSelect(option);
  };
  showPicker = () => {
    this.setState({ visible: true });
  };
  hidePicker = () => {
    this.setState({ visible: false });
  };
  keyExtractor = (item, index) => item?.value?.toString() + index.toString();
  getItemLayout = (_, index) => ({ length: 60, offset: index * 60, index });
  handleTextChange = (text) => {
    this.setState({ search: text });
  };
  renderItem = ({ item }) => (
    <PickerItem
      isSelected={this.props.value === item.value}
      handleSelect={this.handleSelect}
      label={item.label}
      value={item.value}
      backgroundColor={this.props.backgroundColor}
      textColor={this.props.textColor}
      selectedItemBackgroundColor={this.props.selectedItemBackgroundColor}
      selectedItemTextColor={this.props.selectedItemTextColor}
    />
  );
  render() {
    const {
      RenderButton,
      items,
      value,
      placeholder,
      searchable,
      inputStyle,
      cancelable,
      cancelButtonStyle,
      cancelTextStyle,
    } = this.props;
    const selectedItem = items.some((item) => item.value === value)
      ? items.find((item) => item.value === value)
      : { label: placeholder, value: placeholder };
    const selectedIndex = items.some((item) => item.value === value)
      ? items.findIndex((item) => item.value === value)
      : 0;
    const Filtered =
      searchable && this.state.search
        ? items.filter((i) =>
            i.label?.toLowerCase()?.includes(this.state.search.toLowerCase())
          )
        : items;
    return (
      <Fragment>
        <TouchableOpacity activeOpacity={0.75} onPress={this.showPicker}>
          <RenderButton label={selectedItem.label} value={selectedItem.value} />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={this.hidePicker}
          visible={this.state.visible}
        >
          <View style={styles.listContainer}>
            <View style={styles.wrapper}>
              {searchable ? (
                <TextInput
                  value={this.state.search}
                  onChangeText={this.handleTextChange}
                  placeholder="Search..."
                  placeholderTextColor={"#808080"}
                  style={[styles.input, inputStyle]}
                />
              ) : null}
              <FlatList
                keyExtractor={this.keyExtractor}
                initialNumToRender={12}
                getItemLayout={this.getItemLayout}
                style={styles.listStyle}
                data={Filtered}
                renderItem={this.renderItem}
                contentOffset={{ x: 0, y: selectedIndex * 60 }}
              />
              {cancelable ? (
                <TouchableOpacity
                  onPress={this.hidePicker}
                  style={[styles.cancelButton, cancelButtonStyle]}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.cancelText, cancelTextStyle]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </Modal>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerItem: {
    fontSize: 18,
  },
  wrapper: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
  },
  listStyle: {
    backgroundColor: "#FFF",
    width: "100%",
    maxHeight: "100%",
    flexGrow: 0,
  },
  pickerItemContainer: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderBottomColor: "#F2F5F7",
    borderBottomWidth: 1,
    width: "100%",
  },
  defaultButtonStyle: {
    padding: 10,
    paddingHorizontal: 25,
    fontWeight: "bold",
    borderWidth: 0.5,
    borderColor: "#B3B3B3",
    borderRadius: 2,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#FAFAFA",
  },
  cancelButton: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderTopColor: "#F2F5F7",
    borderTopWidth: 1,
  },
  cancelText: {
    fontSize: 16,
  },
});
Picker.defaultProps = {
  searchable: false,
  cancelable: false,
  value: null,
  items: [],
  RenderButton: DefaultButton,
  placeholder: "Select Option",
  onSelect: () => {},
  backgroundColor: "#FAFAFA",
  selectedItemBackgroundColor: "#F2F5F7",
  textColor: "#505050",
  selectedItemTextColor: "#000",
  inputStyle: {},
  cancelButtonStyle: {},
  cancelTextStyle: {},
};
