import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api';
import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleDeleteIncidents(incidentId) {
        try {
            await api.delete(`incidents/${incidentId}`, {
                headers: {
                    authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id != incidentId));

        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.');
            console.error(error);
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>

                <span>Bem Vinda, {ongName}</span>
                
                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('py-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncidents(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}