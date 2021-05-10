import Get_All_User_Details from '../Actions/Users_Action';
const usersIntialState={Usersdetails:[]};
const Get_All_User_Details_Reducer=(state=usersIntialState.Usersdetails,action)=>
{
    switch(action.type)
    {
        case Get_All_User_Details:
               return{
                    ...state,
                    Users:action.data
                }
        break;
        default:{
            return state;
        }    
    }
}

export default Get_All_User_Details_Reducer;