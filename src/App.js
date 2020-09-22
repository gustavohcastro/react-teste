import React, { useEffect, useState } from 'react';
import './App.css';

function App() {


  //States Declaration

  const [clientes, setClientes] = useState([])

  const [nome, setNome] = useState('')
  const [id, setId] = useState('')
  const [telefone, setTelefone] = useState('')

  const [telefoneList, setTelefoneList] = useState([])

  const [alert, setAlert] = useState('')


  //UseEffect to recovery previous data
  useEffect( ()=> {
    async function loadData(){
      const data = await JSON.parse(localStorage.getItem("TESTE_STORAGE"));
      if(data){
        setClientes(data)
      }
    }
    loadData()
  },[])

  function handleAddPhone(){
    setTelefoneList( oldArray => [...oldArray, telefone])
    setTelefone('')
    console.log(telefoneList)
  }
  function handleSubmit(e){
    e.preventDefault();
    if( nome === "" || id === "" || telefoneList.length === 0 ){
      setAlert("Preencha todos os campos")
    }
    else{

      const hasOne = clientes.filter( item => item.id === id)
      console.log(hasOne)
      if(hasOne.length === 0){
        const newRegister = {id, nome, telefoneList}
        setClientes( oldArray => [...oldArray, newRegister])
        setAlert("")
      }
      else{
        setAlert("Identificador ja cadastrado")
      }
    }
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome Completo" value={nome} onChange={ (e) => setNome(e.target.value) }/>
        <input type="text" placeholder="Documento de Identificação" value={id} onChange={ (e) => setId(e.target.value) }/>
       <div className="phone-row">
        <input type="text" placeholder="Telefone" value={telefone} onChange={ (e) => setTelefone(e.target.value) }/>
        <a onClick={handleAddPhone}>+</a>
       </div>
       <div className="phoneList">
         <ul>
           {
             telefoneList.map( item => (
              <li key={item}>
                <a>x</a>
                <span>{item}</span>
              </li>
             )
             )
           }
          
         </ul>
       </div>
        <button type="submit">Cadastrar</button>
        <p>{alert && alert}</p>
      </form>
      <div className="clientes">
        <ul>
          {
            clientes.map( item => (
              <li key={item.id}>
                <p>{item.nome}</p>
                <p>{item.id}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
