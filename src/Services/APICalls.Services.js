import axios from "axios";

const baseurl="http://localhost:62850/api/JewelleryServices_/";
const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

class APIServices
{
      GetUsers=async()=>{
              try
              { 
                  const rest=await axios.get(baseurl+"posts");
                  return rest;
              }
              catch (err) 
              {
                    console.error(err);
              }
      }    

      GetAuthorizedUser=async(UserDetails)=>{
        try
        { 
            const rest=await axios({                 
                  method: 'post',
                  headers:headers,              
                  url: baseurl+"GetAuthorizedUser/Objusers",
                  data: UserDetails                
            });
            return rest;
        }
        catch (err) 
        {
              console.error(err);
        }
      }

      SaveEstimations=async(Estimations)=>{
            try
            { 
                const rest=await axios({                 
                      method: 'post',
                      headers:headers,              
                      url: baseurl+"PostEstimation/EstimationPlanPost",
                      data: Estimations                
                });
                return rest;
            }
            catch (err) 
            {
                  console.error(err);
            }
      }

      GetAllEstimations=async()=>{
            try
            { 
                const rest=await axios.get(baseurl+"GetAllEstimations");
                return rest;
            }
            catch (err) 
            {
                  console.error(err);
            }
    }    
    GetEstimationById=async(Id)=>{
      try
      { 
          const rest=await axios.get(baseurl+"GetEstimationById/"+Id);
          return rest;
      }
      catch (err) 
      {
            console.error(err);
      }
    }
      PutEstimation=async(Estimations)=>{
            try
            { 
                const rest=await axios({                 
                      method: 'put',
                      headers:headers,              
                      url: baseurl+"PutEstimation/EstimationPlan",
                      data: Estimations                
                });
                return rest;
            }
            catch (err) 
            {
                  console.error(err);
            }
      }
      
      DeleteEstimation=async(id)=>
      {
            try
      { 
          const rest=await axios.delete(baseurl+"delete/"+id);
          return rest;
      }
      catch (err) 
      {
            console.error(err);
      }
      }



      GetAllUsers=async()=>{
            try
            { 
                const rest=await axios.get(baseurl+"GetAllUsers");
                return rest;
            }
            catch (err) 
            {
                  console.error(err);
            }
    }  

    GetUsersById=async(Id)=>{
      try
      { 
          const rest=await axios.get(baseurl+"GetUsersById/"+Id);
          return rest;
      }
      catch (err) 
      {
            console.error(err);
      }
    }

    PutUsers=async(users)=>{
      try
      { 
          const rest=await axios({                 
                method: 'put',
                headers:headers,              
                url: baseurl+"Putusers/Users",
                data: users                
          });
          return rest;
      }
      catch (err) 
      {
            console.error(err);
      }
}

AddUsers=async(users)=>{
      try
      { 
          const rest=await axios({                 
                method: 'post',
                headers:headers,              
                url: baseurl+"PostUsers/Users",
                data: users                
          });
          return rest;
      }
      catch (err) 
      {
            console.error(err);
      }
}


DeleteUsers=async(id)=>
{
      try
{ 
    const rest=await axios.delete(baseurl+"DeleteUsers/"+id);
    return rest;
}
catch (err) 
{
      console.error(err);
}
}


}

export default new APIServices();

