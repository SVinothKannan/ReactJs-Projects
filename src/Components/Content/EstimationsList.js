import { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import APIServices from '../../Services/APICalls.Services';

export default class EstimationList extends Component
{

    constructor(props)
    {
        super(props);
        this.Loginvalidator();
		this.state={
            EstimationLists:[]
		}
    }

    componentDidMount()
    {
      this.GetDataList();
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

    GetDataList()
    {
      APIServices.GetAllEstimations().then((res) => {
        debugger
        if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
          
          this.setState({EstimationLists:res.data})
          console.log(this.state.EstimationLists);
        }
        else{}
      });	
    }
Edit(id)
{
    this.props.history.push("/Estimation?id=" + id);
}

    Delete(id)
    {
      let Confirmation = window.confirm("Are you sure to delete this record?");
      switch(Confirmation)
      {
          case true:
            APIServices.DeleteEstimation(id).then((res) => {
              debugger
              if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){
                setTimeout(() => { alert('Data has been deleted!'); 
                 window.location="/EstimationList";
                }, 1000);
              }
              else{}
            });	
            
            break;
          case false:
              break;
          default:
              break;
      }
    }


    render()
    {
        return(
            <div>
 {
                    <Navbar></Navbar> 
                   
                     }
                     {<Sidebar></Sidebar>}<br/><br/>

                     <div class="main-container" style={{'padding':'25px'}}><div class="min-height-200px">
		<div class="pd-ltr-20 xs-pd-20-10"></div>
         <div class="card-box mb-30">
         <div class="pd-20">
         <div class="clearfix">
						<div class="pull-left">
							<h4 class="text-blue h4">Estimation Details</h4>
							<p class="mb-30">All Estimated List </p>
						</div>
						<div class="pull-right">
							<a href="/Estimation" class="btn btn-primary btn-sm scroll-click">Estimation Plan</a>
						</div>
					</div>
         </div>
        
         <div class="pd-20">

         
       
         
         <table id="customers" class="data-table table stripe hover nowrap" style={{'margin-top':'-1em'}}>
    <thead>
      <th>SNo</th>
      <th>GoldPrice</th>
      <th>Weight</th>
      <th>TotalPrice</th>
      <th>Discount %</th>
      <th>Edit</th>
      <th>Delete</th>
    </thead>
    <tbody style={{'overflow-y': 'auto;' }}>

         {  
         
       
         
         this.state.EstimationLists.map((x,i)=>
       
            <tr key={i}>
              <td class="table-plus" style={{"width":"25px"}}>{i+1}</td>
              <td class="table-plus" style={{"width":"25px"}}>{x.goldPrice}</td>
              <td class="table-plus" style={{"width":"25px"}}>{x.weight}</td>
              <td class="table-plus" style={{"width":"25px"}}>{x.totalPrice}</td>
              <td class="table-plus" style={{"width":"25px"}}>{x.discount} %</td>

              <td class="table-plus" style={{"width":"25px"}}><span onClick={(e) => this.Edit(x.estimationPlanId)} style={{'cursor':'pointer'}} title="Edit"><i class="fa fa-edit"></i></span></td>
              <td class="table-plus" style={{"width":"25px"}}><span onClick={(e) => this.Delete(x.estimationPlanId)} style={{'cursor':'pointer'}} title="Delete"><i class="fa fa-trash"></i></span></td>
            </tr>

     )
         
     }

       </tbody>
  </table>
  

  

  </div></div></div></div>


            </div>
      
     
      )
    
    }


}