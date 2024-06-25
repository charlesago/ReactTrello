import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosHttp from '../auth/interceptor';
import { GlobalConstants } from '../Common/gloabl-constants';
import './BoardCreation.css'; // Importer le fichier CSS

export const BoardCreation: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('1'); // Défaut à '1' (Public)

    const { id } = useParams();

    function createBoard() {
        const board = { name, description, visibility };
        axiosHttp.post(GlobalConstants.baseUrl + "board/create/" + id, board)
            .then((response) => {
                console.log(response.data);
            });
    }

    return (
        <div className="container">
            <h1>Create New Board</h1>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
                <input
                    type="text"
                    placeholder="Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                />
                <div className="radio-group">
                    <label htmlFor="public">
                        <input
                            type="radio"
                            name="visibility"
                            value="1"
                            id="public"
                            checked={visibility === '1'}
                            onChange={(e) => setVisibility(e.target.value)}
                        /> Public
                    </label>
                    <label htmlFor="private">
                        <input
                            type="radio"
                            name="visibility"
                            value="2"
                            id="private"
                            checked={visibility === '2'}
                            onChange={(e) => setVisibility(e.target.value)}
                        /> Private
                    </label>
                    <label htmlFor="team">
                        <input
                            type="radio"
                            name="visibility"
                            value="3"
                            id="team"
                            checked={visibility === '3'}
                            onChange={(e) => setVisibility(e.target.value)}
                        /> Team
                    </label>
                </div>
                <button
                    onClick={createBoard}
                    className="btn btn-outline-success"
                    type="submit"
                >
                    Create Board
                </button>
            </div>
        </div>
    );
};

export default BoardCreation;
