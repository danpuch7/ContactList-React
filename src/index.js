import React, { Fragment, Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import './index.css';

// React router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import AddContact from "./Components/AddContact/AddContact";
import EditContact from "./Components/EditContact/EditContact";

// API
import { updateContacts, getAllContacts } from "./Services/api-service";

class App extends Component {
  componentDidMount() {
    getAllContacts().then(data => {
      if (data === null) {
        this.setState({
          List: []
        })
      } else {
        this.setState({
          List: data
        })
      }

    })
  }

  state = {
    List: [],
    CurrentContact: null,
    findContact: "",
    findWhich: "Name"
  }

  onDelete = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const partOne = this.state.List.slice(0, index);
    const partTwo = this.state.List.slice(index + 1);
    const tmpList = [...partOne, ...partTwo];
    this.setState({
      List: tmpList
    })
    updateContacts(tmpList);
  }

  onEdit = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const currentContact = this.state.List[index]
    this.setState({
      CurrentContact: currentContact
    })
  }

  onEditCurrentContact = (currentContact) => {
    const { Id } = currentContact;
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const partOne = this.state.List.slice(0, index);
    const partTwo = this.state.List.slice(index + 1);
    const newList = [...partOne, currentContact, ...partTwo];
    this.setState({
      List: newList
    })
    updateContacts(newList);
  }

  onAddContact = (newContact) => {
    let tmpList = this.state.List.slice();
    tmpList.unshift(newContact);
    this.setState({
      List: tmpList
    })
    updateContacts(tmpList);
  }

  searchName = (event) => {
    let searchName = event.target.value;
    this.setState({
      findContact: searchName
    });
  }

  searchWhich = (event) => {
    let searchWhich = event.target.value;
    this.setState({
      findWhich: searchWhich
    });
    console.log("Which", this.state.findWhich);
  }



  onShowContact = (items, searchValue) => {
    if (searchValue.length === 0) {
      return items;
    }

    if (this.state.findWhich == 'Name') {
      return items.filter(item => {
        return (
          item.Name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        );
      });
    }
    else if (this.state.findWhich == 'Phone') {
      return items.filter(item => {
        return (
          item.Phone.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        );
      });
    }
    else if (this.state.findWhich == 'Email') {
      return items.filter(item => {
        return (
          item.Email.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        );
      });
    }
    else if (this.state.findWhich == 'Status') {
      return items.filter(item => {
        return (
          item.Status.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        );
      });
    }
  };


  render() {
    const showContacts = this.onShowContact(
      this.state.List,
      this.state.findContact,
    );
    const { CurrentContact } = this.state;
    return (
      <Fragment>
        <Router>
          <Header searchName={this.searchName} searchWhich={this.searchWhich} />
          <Switch>
            <Route path="/" exact render={() => <ContactList ContactList={showContacts} onEdit={this.onEdit} onDelete={this.onDelete} />} />
            <Route path="/about" exact component={About} />
            <Route path="/add-contact" exact render={() => <AddContact onAddContact={this.onAddContact} />} />
            <Route path="/edit-contact" exact render={() => <EditContact onEditCurrentContact={this.onEditCurrentContact} Contact={CurrentContact} />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>

    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));