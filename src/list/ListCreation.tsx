import {useState} from "react";
import axiosHttp from "../auth/interceptor.ts";
import {GlobalConstants} from "../Common/gloabl-constants.ts";
import {useNavigate, useParams} from "react-router-dom";

export function ListCreation() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const {id} = useParams()

    async function createList(){
        const list = {name};
        await axiosHttp.post(GlobalConstants.baseUrl+'list/create/'+id, list)
            .then((response) => {
                console.log(response.data);
                setTimeout(()=>{
                    navigate("/board/show/"+id)
                },500)
            })
    }

    return (
        <>
            <h1>Create New List</h1>

            <div className="col-sm-6 offset-sm-3 ">
                <input type="text"
                       placeholder="name"
                       required={true}
                       onChange={(e) => setName(e.target.value)}
                       className="form-control"/>
                <br/>

                <button onClick={createList} className={"btn btn-outline-success"} type="submit">Create a
                    list
                </button>

                <br/>
            </div>
        </>
    );
}