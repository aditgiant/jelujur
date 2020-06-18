import React, { Component } from "react";
 
class OrderForm extends Component {
    state = {
            name: "",
            email: "",
            phone:"",
            message: "",
            subject: "",
            submitted:false
        };

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        state["subject"] = this.props.product;
        this.setState(state);
        console.log(this.state);
      }
      
    handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted!");
        this.showToast();
        // const { name, email, subject, message } = this.state
        // let templateParams = {
        //   from_name: email,
        //   to_name: '<YOUR_EMAIL_ID>',
        //   subject: subject,
        //   message_html: message,
        //  }
        //  emailjs.send(
        //   'gmail',
        //   'template_XXXXXXXX',
        //    templateParams,
        //   'user_XXXXXXXXXXXXXXXXXXXX'
        //  )
        //  this.resetForm()
    }

    showToast = (e) => {
      const state = this.state
      state["submitted"] = true;
      this.setState(state);
      this.props.handleOrderExpand();
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
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Product</label>
                <div className="col-sm-10">
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
                <label className="form-label col-sm-2">Name</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="string"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    placeholder="Your name"
                    />
                </div>
            </div>
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Phone</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="number"
                    name="phone"
                    placeholder="Your phone number"
                    value={this.state.phone}
                    onChange={this.onChange}
                    />
                </div>
            </div>
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Email</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={this.state.email}
                    onChange={this.onChange}
                    />
                </div>
            </div>
            <div id="product-form" className="form-group row">
                <label className="form-label col-sm-2">Message</label>
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
          <br/>
          <br/>
           {this.state.submitted === false &&
           <div id="form-order-submit" onClick={this.handleSubmit}>
              <p>Submit order &nbsp;</p><h3>&gt;</h3>
           </div>}
           {this.state.submitted === true &&
           <div id="form-order-submitted">
              <p><strong>Thanks for your order!</strong></p>
           </div>}
      </form>        
    </div>
    );
  }
}
 
export default OrderForm;