import {View, StyleSheet} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export type BoxedIconProps = {
  name: typeof Ionicons.defaultProps;
  backgroundColor: string;
};

const BoxedIcon = ({name, backgroundColor}: BoxedIconProps) => {
  return (
   <View style={[
      {backgroundColor},
      styles.container,
   ]}>
     <Ionicons name={name} size={22} color="white" />
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 6,
  }
});

export default BoxedIcon;
