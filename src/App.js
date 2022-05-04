import React, { useState } from 'react';
import useEventListener from '@use-it/event-listener';


function App() {
  const [valorTela, setValorTela] = useState("");
  const [resultado, setResultado] = useState(0);
  const [acumulador, setAcumulador] = useState(0);
  const [operacao, setOperacao] = useState(false);

  useEventListener ('keydown', ({key}) => {
    if(key==='.'&& !valorTela.includes (key)){
      addDigitalTela(key)
      return

    }

    if(key==='Delete'){
      limparTela()
      return
    }
    
    if(key==='Backspace'){
      operar('bs')
    return
    }
           
    if(key==='='){
      operar('=')
    return
    }
    
    if(key==='+'|| key==='-' || key==='*' || key==='/'|| /^\d+$/.test (key)){
        addDigitalTela(key)
    return
    }
   
alert("Caracter inválido!");

  })  
  function limparTela(){
    setOperacao(false)
    setValorTela("")
    setResultado(0)
    setAcumulador(0)
  }

  function addDigitalTela(digito){
    if(valorTela.length > 15){
      return
    }
    if ((digito==='+'|| digito==='-' || digito==='*' || digito==='/' ) && operacao) {
      setOperacao (false)
      valorTela(resultado+digito)
      return
    }

    if(operacao){
      setOperacao (false)
      valorTela(digito)
        return
    }
      setValorTela(valorTela+digito)
      return

  }

  function operar(oper){
    if (oper==='bs'){
      let verTela = valorTela
      verTela=verTela.substring(
        0,(verTela.length-1)
      )
      setValorTela(verTela)
      setOperacao(false)
      return
      
    }
    try {
      const r=eval(valorTela)
      setAcumulador(r)
      setResultado(r)
      setOperacao(true)
    } catch (error) {
      setResultado('ERROR')
    }
  }
  return (
     <div className="backgroundTela">
     <div className="meioCalculadora">
       <div className="calculadora">
         <div>
         <p className="resultado">{valorTela}</p>
         <p className="resultado">{resultado}</p>
         <table>
           <tr>
             <td><button type="button" onClick={limparTela}>C</button></td>
             <td><button type="button" onClick={()=>operar('bs')}>M</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('/')}>/</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('*')}>x</button></td>
           </tr>
           <tr>
             <td><button type="button" onClick={()=>addDigitalTela('7')}>7</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('8')}>8</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('9')}>9</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('-')}>-</button></td>
           </tr>
           <tr>
             <td><button type="button" onClick={()=>addDigitalTela('4')}>4</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('5')}>5</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('6')}>6</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('+')}>+</button></td>
           </tr>
           <tr>
             <td><button type="button" onClick={()=>addDigitalTela('1')}>1</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('2')}>2</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('3')}>3</button></td>
             <td rowSpan="2"><button type="button" onClick={()=>operar('=')} style={{height: 106}}>=</button></td>
           </tr>
           <tr>
             <td colSpan="2"><button type="button" onClick={()=>addDigitalTela('0')} style={{width: 106}}>0</button></td>
             <td><button type="button" onClick={()=>addDigitalTela('.')}>.</button></td>
           </tr>
         </table>
       </div>
       </div>
     </div>
   </div>
  )
}

export default App;

