import { apiEndpoints, api} from "./apiRequest";

export const getAllMessage = () => {
    //  Plan:
    //    Make an array and get all the messages from mongodb 
    //    and then push it into the array ans return it back to the origin
    //Code:
    // interface message{
    //     id: string;
    //     user: string;
    //     content: string;
    // }
    // let okStatus:boolean = false;
    // let data:Array<message | any>;
    // try{
    //     api.get(apiEndpoints.getAllMessageEndpoint).then((response:any)=>{
    //         if(response.status === 200){
    //             okStatus = true;
    //             console.log(response)
    //         }
    //     })
    // }
    //  catch(err){
    //      //Throw error 
    //      console.error(err);
    //      okStatus = false
    //  }
} 