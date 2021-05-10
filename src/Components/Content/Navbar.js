import { Component } from "react";


export default class Navbar extends Component{

	signout=(e)=>{
		let Confirmation=window.confirm('Are you sure to logout?');
		if(Confirmation)
		{sessionStorage.clear();
		  window.location='/';
		}
		else{}
	}


render()
{
    return(
       
   
         <div className="header">
             
             <div class="header-left" style={{'cursor':'pointer !important;'}}>&nbsp;&nbsp;&nbsp;&nbsp;<div className="menu-icon fa fa-bars" style={{'cursor':'pointer'}}>&nbsp;&nbsp;</div>
             <div className="brand-logo" style={{"max-width":'30% !important'}}>
				<span style={{"max-width":'30% !important'}}>	
                <img  src={`${process.env.PUBLIC_URL}/assets/images/product-3.jpg`} alt=""/>			
				</span>
                
			</div><h5 style={{'color':'blue'}}>&nbsp;Jewellery Store</h5>	
            </div>
 
            <div class="header-right">
            <div style={{'margin-top': '1.5em'}}><span>Welcome <b>{sessionStorage.getItem('UserSessionname')}</b></span>&nbsp;&nbsp;&nbsp;</div>
			<div class="dashboard-setting user-notification">
                
				<div class="dropdown">
					<a class="dropdown-toggle no-arrow" title='Log Out' href="javascript:;" data-toggle="right-sidebar" onClick={(e)=>this.signout(e)}>
                    <i class="fa fa-power-off"></i>
					</a>
				</div>
			</div>
		
	
			<div class="github-link">
				<a href="https://github.com/dropways/deskapp" target="_blank"><img src={`${process.env.PUBLIC_URL}/assets/vendors/images/github.svg`} alt=""/></a>
			</div>
		
</div></div>

   
    )
}
}
