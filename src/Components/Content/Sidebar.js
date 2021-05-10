import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
export default class SideBar extends Component
{
constructor(props)
{
super(props);
}

    Estimation=(e)=>
    {e.preventDefault();
        window.location ="/Estimation";
    }
EstimationList=(e)=>
{e.preventDefault();
    window.location ="/EstimationList";
}
Users=(e)=>{
    e.preventDefault();
    window.location ="/ManageUsers";
}

   render()
   {
       return(<div class="left-side-bar">
           <div class="brand-logo">
			<a href="index.html">
				
			   <span><i class="fa fa-list"></i>   Jewellery Store</span>
			</a>
			<div class="close-sidebar" data-toggle="left-sidebar-close">
				<i class="fa fa-list"></i>
			</div>
		</div>
        <div class="menu-block customscroll">
        <div class="sidebar-menu">
            <ul id="accordion-menu">
                <li>
                    <a href="javascript:;" onClick={(e)=>this.Estimation(e)} class="dropdown-toggle">
                        <span class="fa fa-bookmark-o"></span><span class="mtext">&nbsp;Estimation Plan</span>
                    </a>
                   
                </li>
                <li>
                <a href="javascript:;" onClick={(e)=>this.EstimationList(e)} class="dropdown-toggle">
                        <span class="fa fa-list"></span><span class="mtext">&nbsp; Estimation List</span>
                        </a>
                   
                </li>
                <li>
                <a href="javascript:;" onClick={(e)=>this.Users(e)} class="dropdown-toggle">
                        <span class="fa fa-user"></span><span class="mtext">&nbsp; Manage User</span>
                        </a>
                   
                </li>
	</ul>
    </div></div></div>
       )
   }
}