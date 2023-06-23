import { useState } from "react";
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTube from 'react-youtube';
import Image from "../../assets/novo-caca-niquel.png";
import XIcon from "../../assets/x-icon.png";
import "./styles.css";


export function PopupImage({ openPopupImg, setOpenPopup }) {

    const videoId = 'G3LZTZ-OraQ';
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        gender: ''
    });

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name) {
            setError('o nome é obrigatório!');
            return;
        }
        if (!form.email) {
            setError('o email é obrigatório!');
            return;
        }
        if (!form.phone) {
            setError('a número de celular é obrigatória');
            return;
        }
        if (!selectedOption) {
            setError('O gênero obrigatória');
            return;
        }
        handleAddUser();
    }

    const handleAddUser = () => {
        console.log({ form });

        const dataUser = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            gender: selectedOption
        }

        console.log({ dataUser });

        clearForm()
        closePopupFunction()
        openAlert()
    }

    const clearForm = () => {
        setError('');

        setForm({
            name: '',
            email: '',
            phone: '',
            gender: ''
        });
    };

    const handleChangeForm = (e) => {
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value })
    };

    const closePopupFunction = () => {
        setOpenPopup(false)
    }

    const openAlert = () => {
        return toast.success("CADASTRO ENVIADO COM SUCESSO", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    return (
        <>
            <ToastContainer />
            <div className="container-popup">
                <img
                    className="x-close"
                    src={XIcon}
                    onClick={closePopupFunction}
                />
                <h1>caça-níquel</h1>
                <h2>Venha conferir o nosso jogo</h2>
                {openPopupImg ?
                    <img
                        className="imagem"
                        src={Image}
                    />
                    :
                    <div className="video">
                        <YouTube videoId={videoId} />
                    </div>
                }
                <form
                    className="div-form"
                    onSubmit={handleSubmit}
                >
                    <span>Faça o seu cadastro aqui</span>
                    <input
                        className={error ? 'error' : 'input'}
                        type='text'
                        placeholder='Nome'
                        name='name'
                        value={form.name}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <input
                        className={error ? 'error' : 'input'}
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={form.email}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <InputMask
                        className={error ? 'error' : 'input'}
                        mask="(99) 99999-9999"
                        type='text'
                        placeholder='Celular (99) 99999-9999'
                        name='phone'
                        value={form.phone}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <select id="selectOption" className={error ? 'error' : 'div-select'} value={selectedOption} onChange={handleChange} >
                        <option value="">Selecione o Gênero</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                    </select>
                    <span className="span-error">{error}</span>
                    <button
                        className="btn-save"
                    >Salvar</button>
                </form>
            </div>
        </>
    )
}