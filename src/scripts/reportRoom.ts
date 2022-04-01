import api from "./api"

const reportRoom = async (): Promise<void> =>{
    await api.instance.post(`${api.endpoints.reportRoom}?key=${api.apiKey}`).then((response:AxiosReposne):void=>{

    })
}