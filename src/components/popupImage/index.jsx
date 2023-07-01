import { useEffect, useState } from "react";
import "./styles.css"
import Image from "../../assets/big-win.png"
import InputMask from 'react-input-mask';
import YouTube from 'react-youtube';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function PopupImage({ openPopupImg, setOpenPopup }) {

    let errorMessage = ''
    const videoId = 'G3LZTZ-OraQ';
    const [checked, setChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState()

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        gender: ''
    });

    const openAlert = () => {
        return toast.error(`${errorMessage}`, {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    useEffect(() => {
        clearForm()
    }, [setOpenPopup])

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name) {
            setError(true)
            errorMessage = 'o nome é obrigatório!'
            openAlert()
            return;
        }
        if (!form.email) {
            setError(true)
            errorMessage = 'o email é obrigatório!'
            openAlert()
            return;
        }
        if (!form.phone) {
            setError(true)
            errorMessage = 'o celular é obrigatório!'
            openAlert()
            return;
        }
        if (!selectedOption) {
            setError(true)
            errorMessage = 'O gênero obrigatória'
            openAlert()
            return;
        }
        if (!checked) {
            setError(true)
            errorMessage = "selecione o quadro para concordar com o uso dos seus dados"
            openAlert()
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

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <>
            <ToastContainer />
            <div className="container-popup">
                <h3
                    className="x-close"
                    onClick={closePopupFunction}
                >X</h3>

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
                <h1>Caça-Níquel</h1>
                <h2>Venha conferir o nosso jogo</h2>
                <form
                    className="div-form"
                    onSubmit={handleSubmit}
                >
                    <span>Faça o seu cadastro aqui</span>
                    <input
                        className={error ? 'input error' : 'input'}
                        type='text'
                        placeholder='Nome'
                        name='name'
                        value={form.name}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <input
                        className={error ? 'input error' : 'input'}
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={form.email}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <InputMask
                        className={error ? 'input error' : 'input'}
                        mask="(99) 99999-9999"
                        type='text'
                        placeholder='Celular (99) 99999-9999'
                        name='phone'
                        value={form.phone}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <select id="selectOption" className={error ? 'div-select error' : 'div-select'} value={selectedOption} onChange={handleChange} >
                        <option value="">Selecione o Gênero</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                    </select>
                    <div className="check-box">
                        <input
                            className={error ? ' error' : ''}
                            type="checkbox"
                            checked={checked}
                            onChange={handleCheckboxChange}
                        />
                        <span>concordo com o uso dos meu dados</span>
                    </div>
                    <button
                        className="btn-save btn-green"
                    >Salvar</button>
                </form>
            </div>
        </>
    )
}