/**
 * Description:
 *
 * The BudgetPlanner displays a screen for a user to input
 * a description and a cost of expenses that they might
 * make during the trip.
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { db } from "../Config";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

const BudgetPlannerV2 = ({ navigation }) => {
  const [textInput, setTextInput] = React.useState("");
  const [costInput, setCostInput] = React.useState("");
  const [Costs, setCosts] = React.useState([]);
  const [Expenses, setExpenses] = React.useState([]);
  const [Dates, setDates] = React.useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [Budget, setBudget] = React.useState([]);
  const [text, setText] = useState("");
  const [total, setTotal] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [numOfDays, setnumOfDays] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  /**
   * References document saved in database for budgetplanner
   */
  const myDoc = doc(db, "BudgetPlanner", uid);
  const docRef = doc(db, "BudgetPlanner", uid);
  const docBudgetRef = doc(db, "UserQuestionnaireAnswers", uid);
  
  /**
   * Retrieves the budget answered in the questionaire from the database
   */
  const getBudget = () => {
    getDoc(docBudgetRef).then((doc) => {
      setBudget(doc.get("budget"));
    });
  };

  /**
   * Retrieves the start date and end date of the users' vacation from the database.
   * Calculates the days in between start date and end date
   */
  const getNumOfDays = () => {
    getDoc(docBudgetRef).then((doc) => {
      var num = moment(doc.get("endDate"), "MM-DD-YYYY").diff(
        moment(doc.get("startDate"), "MM-DD-YYYY"),
        "days"
      );
      setnumOfDays(num);
      return num;
    });
  };

  /**
   * Calculates the total from all expenses.
   */
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < Expenses.length; i++) {
      console.log(Expenses[i].Costs);
      total = parseInt(total) + parseInt(Expenses[i].Costs);
    }
    setTotal(total);
    console.log("TOTAL: ");
    console.log(total);
  };

  //Takes expenses stored in database and adds them to the list
  const addPreviousExpenses = () => {
    getDoc(docRef).then((doc) => {
      setExpenses(doc.get("Expenses"));
    });
  };
  //Creates document for userdata to be stored in firebase database
  const createDoc = async () => {
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      const docRef = doc(db, "BudgetPlanner", uid);
      const docData = {
        Expenses: [],
      };
      setDoc(docRef, docData);
    }
  };

  React.useEffect(() => {
    addPreviousExpenses();
  }, []);

  React.useEffect(() => {
    createDoc();
  }, []);

  React.useEffect(() => {
    getBudget();
  }, []);

  React.useEffect(() => {
    getNumOfDays();
  }, []);

  const ListItem = ({ expense }) => {
    return (
      <View style={styles.listItem}>
        {/*The view that holds the expense */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/*The text for the expense and cost*/}
          <Text
            style={{
              fontWeight: "bold",
              flex: 0.4,
              fontSize: 12,
              color: "#000",
            }}
          >
            {expense.Expenses}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              flex: 0.2,
              fontSize: 12,
              color: "#000",
              paddingHorizontal: 20,
            }}
          >
            {"$" + expense.Costs}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              flex: 0.4,
              fontSize: 12,
              color: "#000",
              paddingHorizontal: 20,
            }}
          >
            {expense.Dates}
          </Text>
        </View>

        {/*Done and Delete buttons*/}
        <TouchableOpacity
          style={[styles.actionIcon]}
          onPress={() => {
            deleteExpense(expense?.id);
          }}
        >
          <Icon name="delete" size={20} color="black" />
        </TouchableOpacity>

        {/* Attempt at edit. */}
        <TouchableOpacity
          style={[styles.actionIcon]}
          onPress={() => {
            editExpense(expense?.id);
          }}
        >
          <Icon name="edit" size={20} color="black" />
        </TouchableOpacity>
        {}
      </View>
    );
  };

  {
    /*Add expense, mark expense done, edit expense, and delete expense functions*/
  }
  const addExpense = () => {
    //gets users doc then updates it after user adds a todo.
    if (textInput == "" || costInput == "") {
      Alert.alert("Error", "Please input an Expense and Cost");

      //For editing expense
    }
    if (textInput && !toggleSubmit) {
      setExpenses(
        Expenses.map((expense) => {
          if (expense.id === isEditItem) {
            return { ...expense, Expenses: textInput, Costs: costInput };
          }
          return expense;
        })
      );
      calculateTotal();
      //set;
      setToggleSubmit(true);
      setTextInput("");
      setCostInput("");
      setIsEditItem(null);
    }

    //adding brand new expense
    if (toggleSubmit) {
      const newExpenses = {
        id: Math.random(),
        Expenses: textInput,
        Costs: costInput,
        Dates: moment().format("DD/MM/YYYY"),
      };

      //calculateTotal(costInput);
      setExpenses([...Expenses, newExpenses]);
      setTextInput("");
      setCostInput("");
      const recentExpenseList = [...Expenses, newExpenses];

      getDoc(docRef).then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          updateDoc(docRef, { Expenses: recentExpenseList }, { merge: true });
        }
      });
      calculateTotal();
    }
    updateDoc(
      docRef,
      { Expenses: Expenses },
      { Costs: Costs },
      { Dates: Dates },
      { merge: true }
    );
    calculateTotal();
  };

    /**
    * Takes expense chosen by the user and deletes it from the database by filtering it out of the user's list.
    */
  const deleteExpense = (expenseId) => {
    const newExpenses = Expenses.filter((expense) => expense.id != expenseId);
    setExpenses(newExpenses);
    calculateTotal();
    updateDoc(docRef, { Expenses: newExpenses }, { merge: true });
  };
  /**
   * Takes expense chosen by the user and edits it by pulling the original 
   * data from the database and allowing the user to change that data
   */
  const editExpense = (expenseId) => {
    let newEditItem = Expenses.find((expense) => {
      return expense.id === expenseId;
    });
    setToggleSubmit(false);
    setTextInput(newEditItem.Expenses);
    setCostInput(newEditItem.Costs);
    setCosts(newEditItem.Costs);
    setIsEditItem(expenseId);
    setExpenses(Expenses);
    updateDoc(docRef, { Expenses: Expenses }, { merge: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={{ marginTop: 25, marginLeft: 15 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Budget Planner</Text>
      </View>
      <View>
        <Text style={styles.budgetTitle}>Your Max budget: ${Budget}</Text>
      </View>
      {/* <View>
        <Text style={styles.budgetTitle}>Total Spent: ${total}</Text>
      </View> */}

      {/* should display  total/numOfDays */}
      <View>
        <Text style={styles.budgetTitle}>
          Estimate Cost per Day: ${Budget / numOfDays}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={Expenses}
        renderItem={({ item }) => <ListItem expense={item} />}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add Expense"
            onChangeText={(text) => setTextInput(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={costInput}
            placeholder="Add Cost"
            onChangeText={(text) => setCostInput(text)}
          />
        </View>

        <TouchableOpacity onPress={addExpense}>
          <View style={styles.iconContainer}>
            <Text style={styles.addText}> + </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  listItem: {
    padding: 20,
    backgroundColor: "#FFD56D",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    justifyContent: "space-evenly",
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  budgetTitle: {
    fontSize: 15,
    marginLeft: 20,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  inputContainer: {
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#C4C4C4",
  },

  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#C4C4C4",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BudgetPlannerV2;
