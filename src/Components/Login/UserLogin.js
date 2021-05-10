import { Component } from "react";
import { useHistory } from "react-router-dom";
import APIServices from '../../Services/APICalls.Services'
import MyLoader from "../Loader/Loader";

export default class UserLogin extends Component
{
    constructor(props)
    {
        super(props);
		this.state={
			isLoading: false,
            show: false,
			UserName:'',
			Password:'',
			UserType:''
		}
    }

    handleOnChange(e)
	{
		this.setState((prevState) => {
			return {
				UserType: e.target.id
			};
		}, () => {			
		});
	}

	Username(e)
	{
		this.setState({UserName:e.target.value});
	}

	Password(e)
	{
		this.setState({Password:e.target.value});
	}


	delayitem=(delayInms)=>{
		return new Promise(resolve => {
		  setTimeout(() => {
			resolve(2);
		  }, delayInms);
		});
	  }

     submitvalues=async(e)=>
	{   
		try{
		this.setState({ isLoading: true });
		e.preventDefault();
		let Objusers=JSON.stringify(this.state);
		console.log(Objusers);
		if(this.state.UserType==undefined||this.state.UserType==null||this.state.UserType==''){
			this.setState({ isLoading: false });alert('Please select Usertype!');return;
		}
		await this.delayitem(1000);
	    await APIServices.GetAuthorizedUser(Objusers).then((res) => {						
			if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 							
				sessionStorage.clear();			
				sessionStorage.setItem('UserSession',res.data.userType);
				sessionStorage.setItem('UserSessionname',res.data.userName);						
				window.location="/Estimation";						
			}
			else{sessionStorage.clear();this.setState({ isLoading: false });alert('Sorry! You are not authorized user!');}
		});
	}
	catch(error){this.setState({ isLoading: false });alert('Something went wrong! Please try again!');console.error(error);}
	}

    render(){
        return(
         <div>
        <div className="login-header box-shadow">
		<div className="container-fluid d-flex justify-content-between align-items-center">
			<div className="brand-logo">
				<a href="login.html">
                <img src={`${process.env.PUBLIC_URL}/assets/images/product-3.jpg`} alt=""/><span style={{'color':'blue'}}>&nbsp;Jewellery Store</span>				
				</a>
			</div>
			<div className="login-menu">
				<ul>
					<li><a href="register.html"></a></li>
				</ul>
			</div>
		</div>
	</div>
   {this.state.isLoading?<div> <MyLoader active={this.state.isLoading}></MyLoader>  </div>:null}
	<div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-md-6 col-lg-7">
					<img src={`${process.env.PUBLIC_URL}/assets/images/register-page-img.png`} alt=""/>
				</div>
				<div className="col-md-6 col-lg-5">
					<div className="login-box bg-white box-shadow border-radius-10">
						<div className="login-title">
							<h2 className="text-center text-primary">Login To Jewellery Store</h2>
						</div>
						<form onSubmit={(e)=>this.submitvalues(e)}>
							<div className="select-role">
								<div className="btn-group btn-group-toggle" data-toggle="buttons">
									<label className="btn active">
										<input type="radio" name="options" id="PrivilegeUser" onClick={(e) => this.handleOnChange(e)}/>
										<div className="icon"><img src={`${process.env.PUBLIC_URL}/assets/images/briefcase.svg`} className="svg" alt=""/></div>
									
										<span>Previlleged User</span>
									</label>
									<label className="btn">
										<input type="radio" name="options" id="NormalUser" onClick={(e) => this.handleOnChange(e)}/>
										<div className="icon"><img src={`${process.env.PUBLIC_URL}/assets/images/person.svg`} className="svg" alt=""/></div>

										<span>Normal User</span>
									</label>
								</div>
							</div>
							<div className="input-group custom">
								<input type="text" className="form-control form-control-lg" placeholder="Username" onChange={(e)=>this.Username(e)} required/>
								<div className="input-group-append custom">
                                <span className="input-group-text">

                                <i className="fa fa-user"></i>
                                </span>
								</div>
							</div>
							<div className="input-group custom">
								<input type="password" className="form-control form-control-lg" placeholder="**********" onChange={(e)=>this.Password(e)} required/>
								<div className="input-group-append custom">
									<span className="input-group-text"><i className="fa fa-lock"></i></span>
								</div>
							</div>
							
							<div className="row">
								<div className="col-sm-12">
									<div className="input-group mb-0">
									
										<button type="submit" className="btn btn-primary btn-lg btn-block" value="Sign In" disabled={this.state.isLoading}>Sign In</button>
									</div>
									
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
    </div>
       
        )
    }
}
