import React, { Component } from "react";
import * as emailjs from 'emailjs-com';
import Envelop from './imgsrc/envelope.png';
 
class OrderForm extends Component {
    state = {
            name: "",
            email: "",
            subject: "",
            phone:"",
            message: "",
            empty:"",
            submitted:false
        };

    onChange = (e) => {
        const state = this.state
        if (e.target.value == "") {
          state["empty"] = "All fields cannot be empty."
          state[e.target.name] = e.target.value;
          state["subject"] = this.props.product;
          this.setState(state);  
        } else {
        state["empty"] = "";
        state[e.target.name] = e.target.value;
        state["subject"] = this.props.product;
        this.setState(state)};
        console.log(this.state);
      }
      
    handleSubmit = (e) => {
        e.preventDefault();
        const { product, name, email, subject, phone, message } = this.state
        if ((name !== "") && (email !== "") && (subject !== "") && (phone !== "") && (message !== "")) {
          console.log("Submitted!");
        this.showToast();
        let templateParams = {
          subject: subject,
          from_name: name,
          email: email,
          phone: phone,
          message_html : message,
         }
         emailjs.send(
          'gmail',
          'template_3v1QmP7B',
           templateParams,
          'user_HPm7oDjEdzA3Bs3tnHiDV'
         )
        } else {
          const state = this.state;
          state["empty"] = "Fill all fields before submitting."
          state["subject"] = this.props.product;
          this.setState(state);  
        }
        
    }

    showToast = (e) => {
      this.setState(prevState => ({ 
        submitted : true
        }), () => console.log(this.state))
      this.props.handleOrderExpand();
    }

    newForm = (e) => {
      this.setState({...this.state,
        name: "",
        email: "",
        subject: this.props.product,
        phone:"",
        message: "",
        submitted:false})
    }

  render() {
    return (
      <div className="order-formbox">
      <i id="order-formbox-close"class="fa fa-times" onClick={this.props.handleOrderExpand}/>
      <h4 id="order-formbox-title" style={{display:"inline-block"}}>Place an order</h4>
      <br/>
      <br/>
      {/* <h4>props :{this.props.product}</h4> */}
      <form id="order-formbody" className="container" onSubmit={this.handleSubmit}>
      {this.state.submitted === true && (
        <img src={Envelop} style={{'maxHeight':'20vh'}}/>
      )}
      {this.state.submitted === false && (
            <>
            {this.state.empty !== "" && <p style={{'textTransform':"uppercase", 'textAlign':'center', 'color':'red'}}>{this.state.empty}</p>}
            <div id="product-form" className="form-group row">
                <label className="form-label col-md-2">Product*</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="string"
                    name="subject"
                    value={this.props.product}
                    onChange={this.onChange}
                    />
                </div>
            </div>
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Name*</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="string"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    placeholder="your name"
                    />
                </div>
            </div>
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Phone*</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="number"
                    name="phone"
                    placeholder="only fill with numbers"
                    value={this.state.phone}
                    onChange={this.onChange}
                    />
                </div>
            </div>
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Email*</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    value={this.state.email}
                    onChange={this.onChange}
                    />
                </div>
            </div>
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Message*</label>
                <div className="col-sm-10">
                  <textarea
                    id = "order-form-message"
                    className="form-control"
                    type="string"
                    name="message"
                    placeholder="Our products are always personally-tailored for you. Tell us how you want them and we will come back to you soon."
                    value={this.state.message}
                    onChange={this.onChange}
                    />
                </div>
            </div>
            </>)}
          <br/>
          <br/>
           {this.state.submitted === false &&
           <div id="form-order-submit" onClick={this.handleSubmit}>
              <p>Submit order &nbsp;</p><h3>&gt;</h3>
           </div>}
           {this.state.submitted === true &&
           <div>
           <div id="form-order-submitted" style={{'display':'block','textAlign':'center', 'alignItems':'center'}}>
              <p style={{'textAlign':'center'}}><strong>Thanks for your order!</strong><br/>
              We're coming back to you as soon as we can :)</p>
           </div><div id="form-order-submit" onClick={this.newForm}>
              <p>Make a new order &nbsp;</p><h3>&gt;</h3>
           </div>
           </div>}
      </form>        
    </div>
    );
  }
}
 
export default OrderForm;