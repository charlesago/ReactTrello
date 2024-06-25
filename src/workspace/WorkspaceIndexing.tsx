import axiosHttp from "../auth/interceptor.ts";
import {useEffect, useState} from "react";
import {GlobalConstants} from "../Common/gloabl-constants.ts";
import {Workspace} from "../interface/Workspace.ts";
import {useNavigate} from "react-router-dom";

export function WorkspaceIndexing() {
    const [isLoading, setLoading] = useState(true);
    const [workspaces , setWorkspaces] = useState();
    const navigate = useNavigate();

  useEffect(() => {
       axiosHttp.get(GlobalConstants.baseUrl+"index").then(response => {
            setWorkspaces(response.data);
            setLoading(false);
        });
    }, []);

    function removeWorkspace(workspace: Workspace) {
        axiosHttp.delete(GlobalConstants.baseUrl+"workspace/delete/"+workspace.id)
            .then(response => {
                console.log(response)
                setTimeout(()=>{
                    navigate("/")
                    window.location.reload()
                },500)
            })
    }


    if (isLoading) {
        return <div className="App">Loading...</div>;
    }



    return (
        <div className="cards">
            {workspaces.map((workspace: Workspace)=> (
                <div key={workspace.id} className="card">
                    <h5>Id={workspace.id}</h5>
                    <h4><strong>Titre</strong></h4>
                    <p>{workspace.name}</p>
                    <h4><strong>Description</strong></h4>
                    <p><i>{workspace.description}</i></p>
                    <p className="card-footer">Created by {workspace.owner.username}</p>
                    <a onClick={()=>removeWorkspace(workspace)} className="btn btn-outline-danger">Supprimer</a>
                    <a onClick={()=>navigate("/workspace/edit/"+workspace.id)} className="btn btn-outline-warning">Editer ce workspace</a>
                    <a onClick={()=>navigate("/board/create/"+workspace.id)} className="btn btn-outline-secondary">Ajouter un tableau</a>
                    <a onClick={()=>navigate("/board/showAll/"+workspace.id)} className="btn btn-outline-dark">Voir les tableaux de ce workspace</a>
                </div>
            ))}
        </div>
    );
}