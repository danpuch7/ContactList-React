import React, { Fragment } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from "react-router-dom";
class EditContact extends React.Component {

    state = {
        "Id": this.props.Contact.Id,
        "Avatar": "",
        "Gender": "",
        "Name": "",
        "Phone": "",
        "Email": "",
        "Status": "",
        "isRedirect": false
    }

    getName = (e) => {
        const name = e.target.value;
        this.setState({
            Name: name
        })
    }

    getEmail = (e) => {
        const email = e.target.value;
        this.setState({
            Email: email
        })
    }

    getPhone = (e) => {
        const phone = e.target.value;
        this.setState({
            Phone: phone
        })
    }

    getStatus = (e) => {
        const status = e.target.value;
        this.setState({
            Status: status
        })
    }

    getGender = (e) => {
        const gender = e.target.value;
        this.setState({
            Gender: gender
        })
    }

    getAvatar = (e) => {
        const avatar = e.target.value;
        this.setState({
            Avatar: avatar
        })
    }

    sendForm = (e) => {
        e.preventDefault();
        const {Id, Avatar, Gender, Name, Phone, Email, Status } = this.state;
        const { onEditCurrentContact } = this.props;

        const newContact = {
            Id: Id,
            "Avatar": parseInt(Avatar),
            "Gender": Gender,
            "Name": Name,
            "Phone": Phone,
            "Email": Email,
            "Status": Status,
        }
        onEditCurrentContact(newContact)
        this.setState({
            "isRedirect": true
        })
    }

    render() {
        const { isRedirect } = this.state;
        const { Id, Avatar, Gender, Name, Phone, Email, Status } = this.props.Contact;
        if (isRedirect) {
            return <Redirect to="/" />
        }
        return (
            <Fragment>
                <div className="container">
                    <h2>Add new contact</h2>
                    <form onSubmit={this.sendForm}>
                        <div className="form-group">
                            <fieldset disabled="">
                                <label className="form-label">Name</label>
                                <input className="form-control" required type="text" onChange={this.getName} placeholder={Name} />
                            </fieldset>
                        </div>

                        <div className="form-group">
                            <fieldset>
                                <label className="form-label mt-4">Email</label>
                                <input className="form-control" required type="email" onChange={this.getEmail} placeholder={Email} />
                            </fieldset>
                        </div>

                        <div className="form-group has-success">
                            <label className="form-label mt-4" >Phone</label>
                            <input type="tel" placeholder={Phone} required onChange={this.getPhone} className="form-control is-valid" />
                        </div>

                        <div className="form-group has-danger">
                            <label className="form-label mt-4" >Ststus</label>
                            <input type="text" placeholder={Status} required onChange={this.getStatus} className="form-control is-invalid" />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label col-form-label-lg mt-4">Gender</label>
                            <input className="form-control form-control-lg" required onChange={this.getGender} type="text" placeholder={Gender} />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label mt-4" >Avatar</label>
                            <input type="number" min="0" max="99" required onChange={this.getAvatar} className="form-control" placeholder={Avatar} />
                        </div>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default EditContact;