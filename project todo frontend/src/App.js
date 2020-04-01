import React from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";

class App extends React.Component {
  state = {
    arrayOfTask: [],
    inputValue: "",
    inputStateAfterClick: true,
    currentValueForFilter: "all",
    allCompleted: false
  };

  async componentDidMount() {
    try {
      const request = await axios.get(`http://localhost:1234/todos/all`);
      this.setState({
        arrayOfTask: [...request.data]
      });
    } catch (err) {
      console.error(err);
    }
  }

  // componentDidUpdate() {
    
  // }

  handleChange = event => {
    const newValue = event.target.value;
    this.setState({ inputValue: newValue });
  };

  addTask = event => {
    const { inputValue, arrayOfTask } = this.state;
    if (event.key === "Enter" && event.target.value !== "") {
      const newElem = { text: inputValue, completed: false };
      axios
        .post(`http://localhost:1234/todos/create`, { ...newElem })
        .then(res => {
          this.setState({
            arrayOfTask: [...arrayOfTask, res.data],
            inputValue: ""
          });
          toast(`Add task: ${inputValue}`);
        })
        .catch(err => console.error("err", err));
    }
  };

  getTask = (id, value) => {
    const newArr = [...this.state.arrayOfTask];
    newArr.map(task => {
      if (task._id === id) {
        return { ...task, inputValue: value };
      }
    });
    axios
      .put(`http://localhost:1234/todos/${id}/update`, { text: value })
      .then(res => {
        this.setState({ arrayOfTask: newArr });
      })
      .catch(err => console.error(err));
  };

  setFilter = value => {
    this.setState({ currentValueForFilter: value });
  };

  filterArrayOfItems = (array, condition) =>
    array.filter(item => item.completed !== condition);

  generateArrayWithFilter = () => {
    const { arrayOfTask, currentValueForFilter } = this.state;
    switch (currentValueForFilter) {
      case "active":
        return this.filterArrayOfItems(arrayOfTask, true);
      case "completed":
        return this.filterArrayOfItems(arrayOfTask, false);
      default:
        return arrayOfTask;
    }
  };

  completedTask = (id, completed) => {
    const { arrayOfTask } = this.state;
    const newArray = arrayOfTask.map(task => {
      if (task._id === id) {
        return { ...task, completed: !task.completed };
      }
      return task
    });
    axios
      .put(`http://localhost:1234/todos/${id}/completed`, { completed })
      .then(res => {
        this.setState({ arrayOfTask: [...newArray] });
        toast.success(`Task completed:${res.data.text}`);
      })
      .catch(err => console.error(err));
  };

  removeCompletedTask = () => {
    const { arrayOfTask } = this.state;
    const completedFalse = arrayOfTask.filter(elem => {
      return elem.completed === false;
    });
    axios
      .delete(`http://localhost:1234/todos/deletecompl`)
      .then(res => {
        toast.warn("Remove completed task");
        this.setState({ arrayOfTask: [...completedFalse] });
      })
      .catch(err => console.error(err));
  };

  removeTask = id => {
    const data = this.state.arrayOfTask;
    const newArr = data.filter(task => {
      if (task.id === id) toast.warn(`Remove task: ${task.inputValue}`);
      return task._id != id;
    });
    axios
      .delete(`http://localhost:1234/todos/${id}/delete`)
      .then(res => {
        this.setState({ arrayOfTask: [...newArr] });
      })
      .catch(err => console.error(err));
  };

  allCompleted = () => {
    const { arrayOfTask } = this.state;
    const newArray = arrayOfTask.map(task => {
      if (this.state.allCompleted) return { ...task, completed: false };
      else return { ...task, completed: true };
    });
    axios
      .put(`http://localhost:1234/todos/update`, {
        completed: !this.state.allCompleted
      })
      .then(res => {
        console.log(res);
        if (this.state.allCompleted) toast.info("No tasks marked");
        else toast.info("All tasks marked");
        this.setState({
          arrayOfTask: [...newArray],
          allCompleted: !this.state.allCompleted
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <ToastContainer />
        <h1 className="title">todos</h1>
        <div className="container">
          <Header
            arrayOfTask={this.state.arrayOfTask}
            allCompleted={this.allCompleted}
            handleChange={this.handleChange}
            addTask={this.addTask}
            value={this.state.inputValue}
          />
          <ItemList
            getTask={this.getTask}
            completedTask={this.completedTask}
            generateArrayWithFilter={this.generateArrayWithFilter}
            removeTask={this.removeTask}
            inputStateAfterClick={this.state.inputStateAfterClick}
            arrayOfTask={this.state.arrayOfTask}
          />
          <Footer
            data={this.state}
            setFilter={this.setFilter}
            removeCompletedTask={this.removeCompletedTask}
          />
        </div>
      </>
    );
  }
}

export default App;
