import {GlobalConstants} from "../Common/gloabl-constants.ts";
import {useState} from "react";
import axiosHttp from "../auth/interceptor.ts";
import {useParams} from "react-router-dom";

export const WorkspaceEditing = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const {id} = useParams();


    async function editWorkspace(){
        const editedWorkspace = {name,description,type}
        await axiosHttp.put(GlobalConstants.baseUrl+'workspace/edit/'+id, editedWorkspace)
            .then((response) => {
                console.log(response.data);
            })
    }



    return (
        <>
            <h1>Edit a Workspace</h1>

            <div className="col-sm-6 offset-sm-3 ">
                <input type="text"
                       placeholder="name"
                       required={true}
                       onChange={(e) => setName(e.target.value)}
                       className="form-control"/>

                <input type="text"
                       required={true}
                       placeholder="description"
                       onChange={(e) => setDescription(e.target.value)}
                       className="form-control"/>
                <br/>


                <label htmlFor="1">Public</label>
                <input type={"radio"}
                       placeholder="Public"
                       name={"type"}
                       value="1"
                       checked
                       onChange={(e) => setType(e.target.value)}
                />
                <br/>

                <label htmlFor="2">Private</label>
                <input type={"radio"}
                       placeholder="Private"
                       name={"type"}
                       value="2"
                       onChange={(e) => setType(e.target.value)}
                />
                <br/>

                <label htmlFor="3">Team</label>
                <input type={"radio"}
                       placeholder="Team"
                       name={"type"}
                       value="3"
                       onChange={(e) => setType(e.target.value)}
                />
                <br/>


                <button onClick={editWorkspace} className={"btn btn-outline-success"} type="submit">edit this
                    workspace
                </button>

                <br/>
            </div>
        </>
    );
};