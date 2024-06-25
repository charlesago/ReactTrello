import React, { useState } from 'react';
import axiosHttp from '../auth/interceptor';
import { GlobalConstants } from '../Common/gloabl-constants';
import './WorkspaceCreation.css'; // Importer le fichier CSS

export const WorkspaceCreation: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('1'); // Défaut à '1' (Public)

    async function createWorkspace() {
        const workspace = { name, description, type };
        await axiosHttp.post(GlobalConstants.baseUrl + 'workspace/create', workspace)
            .then((response) => {
                console.log(response.data);
            });
    }

    return (
        <div className="container">
            <h1>Create New Workspace</h1>
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
                            name="type"
                            value="1"
                            id="public"
                            checked={type === '1'}
                            onChange={(e) => setType(e.target.value)}
                        /> Public
                    </label>
                    <label htmlFor="private">
                        <input
                            type="radio"
                            name="type"
                            value="2"
                            id="private"
                            checked={type === '2'}
                            onChange={(e) => setType(e.target.value)}
                        /> Private
                    </label>
                    <label htmlFor="team">
                        <input
                            type="radio"
                            name="type"
                            value="3"
                            id="team"
                            checked={type === '3'}
                            onChange={(e) => setType(e.target.value)}
                        /> Team
                    </label>
                </div>
                <button
                    onClick={createWorkspace}
                    className="btn btn-outline-success"
                    type="submit"
                >
                    Create Workspace
                </button>
            </div>
        </div>
    );
};
