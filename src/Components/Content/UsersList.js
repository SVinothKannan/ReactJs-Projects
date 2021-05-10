import { Component } from "react";
import APIServices from '../../Services/APICalls.Services';
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import Get_All_User_Details from '../../Redux/Actions/Users_Action';
import Get_All_User_Details_Reducer from '../../Redux/Reducers/Users_Reducer';
import { connect } from "react-redux";

const initialState = {
    UserId:0,
    UserName:'',
    PassWord:'',
    userType:'Select'
};

class UsersList extends Component
{
    constructor(props)
    {
        super(props);//this.Loginvalidator();
        this.state={
            UsersList:[],
            UserId:0,
            UserName:'',
            PassWord:'',
            userType:'Select',
        }
       
    }

    shouldComponentUpdate()
    {
        if(sessionStorage.getItem('UserSession')!=undefined&&sessionStorage.getItem('UserSession')!=null)
        {return true;}
        else{return false;window.location='/';}
    }

    Loginvalidator(){
        if(sessionStorage.getItem('UserSession')!=undefined&&sessionStorage.getItem('UserSession')!=null)
        {return true;}
        else{window.location='/';}
    }

    resetstate=()=>{
         this.setState(initialState);
    }

    componentDidMount()
    {
       this.props.Get_All_User_Details();	
    }


    Usernamechange=(e)=>{
        e.preventDefault();
        this.setState({UserName:e.target.value});
       }
       
       Passwordchange=(e)=>{
           e.preventDefault();
           this.setState({PassWord:e.target.value});
       }
   
       UserTypechange=(e)=>{
           e.preventDefault();
           this.setState({userType:e.target.value});
       }

     Edit=(userid)=>{
debugger
        APIServices.GetUsersById(userid).then((res) => {
			debugger
			if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
                this.setState({UserId:res.data.userId,UserName:res.data.userName,PassWord:res.data.password,userType:res.data.userType});
			}
			else{}
		});	
     }

     Delete=(userid)=>{
        let Confirmation = window.confirm("Are you sure to delete this record?");
        switch(Confirmation)
        {
            case true:
        APIServices.DeleteUsers(userid).then((res) => {
			debugger
			if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
               //alert('Details Deleted!');
               window.location='/ManageUsers';
			}
			else{}
		});	
        break;
        case false:
            break;
            default:break;
    }
     }

     UpdateUser=(e)=>{
        try{
        let Userdetails=JSON.stringify(this.state);
        if(this.state.userType=='Select')
        {   e.preventDefault();
            alert('Please select Usertype');return false;
        }
        if((Userdetails!=null&&Userdetails!=undefined)&&(this.state.UserId<=0)){
        APIServices.AddUsers(Userdetails).then((res) => {
            debugger
            if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
                    alert('User Created!');  
                    window.location='/ManageUsers';
            }
            else{}
         });
        }
        else{

        APIServices.PutUsers(Userdetails).then((res) => {
            debugger
            if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
                    alert('Data Updated!');  
                    window.location='/ManageUsers';
            }
            else{}
         });
        }
        }
        catch(error){console.log(error);}
     }


     AddUsers=(e)=>{
        this.resetstate();
     }



    render()
    {
        return(
            <div>
                {<Navbar></Navbar>}{<Sidebar></Sidebar>}<br/><br/>
                   <div class="main-container" style={{'padding':'25px'}}><div class="min-height-200px">
		<div class="pd-ltr-20 xs-pd-20-10"></div>
         <div class="card-box mb-30">
         <div class="pd-20">
         <div class="clearfix">
						<div class="pull-left">
							<h4 class="text-blue h4">Users Details</h4>
							<p class="mb-30">All Users </p>
						</div>
						<div class="pull-right">
							<button className="Addusers"data-toggle="modal" data-target="#bd-example-modal-lg" data-backdrop="static" data-keyboard="false" onClick={(e)=>this.AddUsers(e)} class="btn btn-primary btn-sm scroll-click"><i className='fa fa-user' >&nbsp;<b style={{'color':'white !important;'}}>Add User</b></i></button>
						</div>
					</div>
         </div>
        
         <div class="pd-20">
         
         <table id="customers" class="data-table table stripe hover nowrap" style={{'margin-top':'-1em'}}>
    <thead>
      <th>SNo</th>
      <th>UserName</th>
      <th>Password</th>
      <th>UserType</th>
      <th>Edit</th>
      <th>Delete</th>
    </thead>
    <tbody style={{'overflow-y': 'auto;' }}>
         {  
         this.props.Users!=undefined?
         this.props.Users.map((x,i)=>
       
            <tr key={i}>
              <td class="table-plus" style={{"width":"25px"}}>{i+1}</td>
              <td class="table-plus" style={{"width":"25px"}}>{x.userName}</td>
              <td class="table-plus" style={{"width":"25px"}}>*******</td>
              <td class="table-plus" style={{"width":"25px"}}>{x.userType}</td>

              <td class="table-plus" style={{"width":"25px"}}><span data-toggle="modal" data-target="#bd-example-modal-lg" data-backdrop="static" data-keyboard="false" onClick={(e) => this.Edit(x.userId)} style={{'cursor':'pointer'}} title="Edit"><i class="fa fa-edit"></i></span></td>
              <td class="table-plus" style={{"width":"25px"}}><span onClick={(e) => this.Delete(x.userId)} style={{'cursor':'pointer'}} title="Delete"><i class="fa fa-trash"></i></span></td>
            </tr>

     ):[]
         
     }

       </tbody>
  </table>
  

  

  </div></div></div></div>
  <form onSubmit={(e)=>this.UpdateUser(e)}>
  <div class="modal fade bs-example-modal-lg show" id="bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"  aria-modal="true">
								<div class="modal-dialog modal-lg modal-dialog-centered"> 
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title" id="myLargeModalLabel"><i className="fa fa-user"></i>&nbsp;Add / Update User</h4>
											<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
										</div>
										<div class="modal-body">
                       
						<div class="form-group row">
							<label class="col-sm-12 col-md-2 col-form-label">UserName</label>
							<div class="col-sm-12 col-md-10">
                                <input type="hidden" value={this.state.UserId} name="hiduserid" id="hiduserid"/>
								<input class="form-control" type="text" placeholder="UserName" value={this.state.UserName}  onChange={(e)=>this.Usernamechange(e)} required='required'/>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-12 col-md-2 col-form-label">Password</label>
							<div class="col-sm-12 col-md-10">
								<input class="form-control" placeholder="Password" type="password" value={this.state.PassWord}  onChange={(e)=>this.Passwordchange(e)} required/>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-12 col-md-2 col-form-label">UserType</label>
							<div class="col-sm-12 col-md-10">
								{/* <input class="form-control" type="text"   value={this.state.userType} onChange={(e)=>this.UserTypechange(e)} required id="usertype"/> */}
                                <select value={this.state.userType} class="form-control" onChange={(e)=>this.UserTypechange(e)}>
                                <option value="Select">---Select---</option>
  <option value="PrivilegeUser">Privilege User</option>
  <option value="NormalUser">Normal User</option>
  
</select>
							</div>
						</div>
                        
										</div>
										<div class="modal-footer">
                                            <button  class="btn btn-success">Create</button>
											<button  onClick={(e)=>this.resetstate(e)} type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
                            </form>  </div>
        )
    }

} 



const mapStateToProps = (state) => {
    debugger
    return {      
        Users: state.Users.Users||[],
    };
    
  };
  const mapDispachToProps = (dispatch) => {
    return {
        Get_All_User_Details: (data) => {
       
            APIServices.GetAllUsers().then((res) => {
        
        if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
            dispatch({ type: Get_All_User_Details, data: res.data })
          console.log(res.data);
        }
        else{}
      })    } 
    };
  };
 

export default connect(mapStateToProps,mapDispachToProps)(UsersList);
