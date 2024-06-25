import {useEffect, useState} from "react";
import axiosHttp from "../auth/interceptor.ts";
import {GlobalConstants} from "../Common/gloabl-constants.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Board} from "../interface/Board.ts";

export function BoardIndexing() {
    const [isLoading, setLoading] = useState(true);
    const [boards , setBoards] = useState();
    const navigate = useNavigate();
    const {id}= useParams();

    useEffect(() => {
        axiosHttp.get(GlobalConstants.baseUrl+"board/showAll/"+id)
            .then((response)=>{
                setBoards(response.data);
                setLoading(false)
            })
    },[]);

    function removeBoard(board: Board) {
        axiosHttp.delete(GlobalConstants.baseUrl+"board/delete/"+board.id)
            .then(response => {
                console.log(response)
                setTimeout(()=>{
                    navigate("/board/showAll/"+id)
                    window.location.reload()
                },500)
            })
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <>
            <a onClick={() => navigate("/workspace/index")} className="btn btn-outline-dark">Retour</a>
            <div className="boards">
                {boards.map((board: Board) => (
                    <div key={board.id} className="card">
                        <h5>Id={board.id}</h5>
                        <h4><strong>Titre</strong></h4>
                        <p>{board.name}</p>
                        <h4><strong>Description</strong></h4>
                        <p><i>{board.description}</i></p>
                        <a onClick={() => navigate("/board/show/" + board.id)} className="btn btn-outline-dark">Voir</a>
                        <a onClick={() => removeBoard(board)} className="btn btn-outline-danger">Supprimer</a>
                    </div>
                ))}
            </div>
        </>
    );
}