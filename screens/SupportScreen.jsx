import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>Easy</Text>
          <Text style={styles.headerTextRide}> Ride</Text>
        </View>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.supportText}>
          If you have any requests or need to contact the team, reach us at
          EasyRide@global.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5, // Add margin to bring the text down
  },
  headerTextRide: {
    color: "#FF8C00", // Orange color
    fontStyle: "italic",
    marginTop: 5, // Add margin to bring the text down
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  supportText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SupportScreen;
