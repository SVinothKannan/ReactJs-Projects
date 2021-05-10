import { Component } from "react";
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import UserLogin  from '../Login/UserLogin';
import EstimationPlan from '../Content/EstimationPlan';
import EstimationList from '../Content/EstimationsList';
import UsersList from "./UsersList";
export default class Content extends Component
{
  
   render()
   {
      return(
           <Switch>
                    <Route exact path="/" component={UserLogin}></Route> 
                    <Route exact path="/Estimation" component={EstimationPlan}></Route>
                    <Route exact path="/EstimationList" component={EstimationList}></Route>
                    <Route exact path="/ManageUsers" component={UsersList}></Route>
           </Switch>
      )
   }
}




