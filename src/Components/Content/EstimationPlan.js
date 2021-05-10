import { Component } from "react";
import Navbar from "./Navbar";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Sidebar from './Sidebar';
import APIServices from '../../Services/APICalls.Services'
import queryString from 'query-string';
export default class Estimation extends Component
{
    
    constructor(props)
    {debugger
        super(props);this.Loginvalidator();
        var params = queryString.parse(this.props.location.search);
        var paramId=(params!=null&&params!=undefined&&params.id!=NaN)?parseInt(params.id):parseInt(0);
        this.GetValue(paramId);
		this.state={
            estimationPlanId:(parseInt(paramId)>0||parseInt(paramId)==0)?parseInt(paramId):parseInt(0),
            GoldPrice:0,
            Weight:0,
            TotalPrice:0,
            discount:sessionStorage.getItem('UserSession')=='PrivilegeUser'?2:0,          
			UserType:sessionStorage.getItem('UserSession'),
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

    GetValue(id)
    {
        APIServices.GetEstimationById(id).then((res) => {
			debugger
			if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
                this.setState({GoldPrice:res.data.goldPrice,discount:res.data.discount,Weight:res.data.weight,TotalPrice:res.data.totalPrice});
			}
			else{}
		});	
    }

    Calculate=(e)=>
    {  try{
        var perm=this.Validation();
        if(!perm){return false;}
        e.preventDefault();
        var disc= this.state.UserType=='PrivilegeUser'?document.getElementById("discount").value:0;
        var totprice=(this.state.GoldPrice * this.state.Weight);
        var discvalue=(disc/100)*totprice;
        var values=this.state.UserType=='PrivilegeUser'?totprice-discvalue:totprice;
        document.getElementById("totprices").value=values.toFixed(2);
        this.setState({TotalPrice:parseFloat(values.toFixed(2))});
    }
    catch(error){ console.error(error);}
    }

    Weightchange(e)
    {
       e.preventDefault();
       this.setState({Weight:parseFloat(e.target.value)});
    
    }

    GPchange(e)
    {
        e.preventDefault();
        this.setState({GoldPrice:parseFloat(e.target.value)});
    }

    Tpricechange(e)
    {
        e.preventDefault();
        this.setState({TotalPrice:parseFloat(e.target.value)});
        
    }


    Discchange(e)
    {
        e.preventDefault();
        this.setState({discount:parseInt(e.target.value)});
    }

    GetPdf(e)
    {html2canvas(document.querySelector("#tyuuuu")).then(canvas => {
        var doc = new jsPDF("p", "mm", "a4");
var width = doc.internal.pageSize.getWidth();
var height = doc.internal.pageSize.getHeight();
const imgData = canvas.toDataURL('image/png');
doc.addImage(imgData, 'PNG', 2, 2,180 ,180);
doc.save("EstimationCopy.pdf");
    });
    }

    TakeScreen(e)
    {
        html2canvas(document.querySelector("#tyuuuu")).then(canvas => {
            var image = new Image();
            image.id = "pic";
            image.src = canvas.toDataURL();
            document.getElementById("image").innerHTML = "";
            document.getElementById("image").style.maxWidth="95%";
            document.getElementById("image").appendChild(image);
        });
    }
    Print(e)
    {
       window.print();
    }
     
    Validation=()=>{
        if(this.state.GoldPrice<=0 || this.state.Weight<=0)
        {
            return false;
        }
        return true;
    }
    SaveEstimation=async(e)=>
    {try{   
        await this.Calculate(e);
        var perm=this.Validation();
        if(!perm){return false;}
        e.preventDefault();
        var Estimates=JSON.stringify(this.state);
         if(this.state.estimationPlanId!=null && this.state.estimationPlanId!=NaN && this.state.estimationPlanId>0)
         {
            
            APIServices.PutEstimation(Estimates).then((res) => {
               debugger
               if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
                       alert('Data Updated!');  
                       window.location='/EstimationList';
               }
               else{}
            });
         }
         else{
            
         console.log(Estimates);
         APIServices.SaveEstimations(Estimates).then((res) => {
			debugger
			if((res!=null&&res!=undefined) &&(res.data!=undefined && res.data!='')){ 
                alert('Data Saved!');  
                window.location='/EstimationList';    
			}
			else{}
		});	
       }
    }
    catch(error){   console.error(error);}
    }
    Close(e)
    {e.preventDefault();
        window.location='/EstimationList';
    }

    render(){
        return(
                  <div id="tyuuuu"> 
                     {
                    <Navbar></Navbar> 
                   
                     }
                     {<Sidebar></Sidebar>}
             
                      <div class="main-container" style={{'marginTop':'-1em'}}>
		<div class="pd-ltr-20 xs-pd-20-10">
			<div class="min-height-200px">
  
               
                <div class="pd-20 card-box mb-30">
					<div class="clearfix">
						<div class="pull-left">
							<h4 class="text-blue h4">Estimation Plan</h4>
							<p class="mb-30">Calculate your gold estimation here </p>
						</div>
						<div class="pull-right">
							<a href="#basic-form1" class="btn btn-primary btn-sm scroll-click" rel="content-y"  data-toggle="collapse" role="button"><i class="fa fa-user"></i> Welcome: <b>{sessionStorage.getItem('UserSession')}</b></a>
						</div>
					</div>
					<form onSubmit={(e)=>this.Calculate(e)}>
						<div class="form-group row">
							<label class="col-sm-12 col-md-2 col-form-label">Gold Price (per gram)</label>
							<div class="col-sm-12 col-md-10">
								<input class="form-control" type="text" placeholder="Gold Price" value={this.state.GoldPrice}  onChange={(e)=>this.GPchange(e)} required/>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-12 col-md-2 col-form-label">Weight (grams)</label>
							<div class="col-sm-12 col-md-10">
								<input class="form-control" placeholder="Search Here" type="text" value={this.state.Weight}  onChange={(e)=>this.Weightchange(e)} required/>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-12 col-md-2 col-form-label">Total Price</label>
							<div class="col-sm-12 col-md-10">
								<input class="form-control" type="text" placeholder="Total Price"  value={this.state.TotalPrice} onChange={(e)=>this.Tpricechange(e)} readOnly id="totprices"/>
							</div>
						</div>
                        
                        {this.state.UserType=='PrivilegeUser'?
						<div class="form-group row" >
                         <label class="col-sm-3 col-md-2 col-form-label"></label>
                         <label class="col-sm-7 col-md-1 col-form-label">Discount%</label>
							<div class="col-sm-2 col-md-1">
								<input class="form-control" type="text"  onChange={(e)=>this.Discchange(e)} value={this.state.discount}  name="discount" id="discount"></input>
							</div>%
						</div>:null
    }
                        <br/>
						<div class="form-group row">
							<label class="col-sm-3 col-md-2">
                                <button type="submit" className="btn btn-primary btn-sm scroll-click">
                                    <i className="fa fa-calculator"></i>&nbsp;
                                    Calculate</button>
                            </label>
							<div class="col-sm-3 col-md-2">
                            <button type="button" data-toggle="modal" data-target="#bd-example-modal-lg" className="btn btn-primary btn-sm scroll-click" onClick={(e)=>this.TakeScreen(e)}> <i className="fa fa-desktop"></i>&nbsp; Print to Screen</button>
							</div>
                            <div class="col-sm-3 col-md-2">
                            <button type="button" className="btn btn-primary btn-sm scroll-click" onClick={(e)=>this.GetPdf(e)}><i className="fa fa-file"></i>&nbsp; Print to File</button>
							</div>
                            <div class="col-sm-3 col-md-2">
                            <button type="button" onClick={(e)=>this.Print()} className="btn btn-primary btn-sm scroll-click"><i className="fa fa-print"></i>&nbsp; Print to Paper</button>
							</div>
                            <div class="col-sm-3 col-md-2">
                            <button type="submit" onClick={(e)=>this.SaveEstimation(e)} className="btn btn-primary btn-sm scroll-click"><i className="fa fa-save"></i>&nbsp;&nbsp;Save Estimation</button>
							</div>
                            <div class="col-sm-3 col-md-2">
                            <button type="submit" onClick={(e)=>this.Close(e)} className="btn btn-danger btn-sm scroll-click"><i className="fa fa-close"></i>&nbsp;Close</button>
							</div>
						</div>
					
						
					</form>


                    <div class="modal fade bs-example-modal-sm show" id="bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"  aria-modal="true">
								<div class="modal-dialog modal-lg modal-dialog-centered">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title" id="myLargeModalLabel">Print Screen</h4>
											<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
										</div>
										<div class="modal-body">
                     <div id="image" style={{'marginTop':'-1em'}}></div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
                    </div></div></div></div></div>
                   
                
        )
    }
}


