import React from "react";
import "./style.css";

export default function App() {
  const [input,setInput]=React.useState('');
  const [arrcpy,setArrcpy]=React.useState([]);
  const [check,setCheck]=React.useState(arrcpy.map(()=>false));
  const [isEditing, setIsEditing] = React.useState(arrcpy.map(() => false));
  const [editValue, setEditValue] = React.useState('');
  const [completed, setCompleted]=React.useState(arrcpy.map(()=>false));

  function handleClick(index){
    let arr=arrcpy;
    const filteredArr=arr.filter((a,i)=>{
      return i!=index;
    })
    setArrcpy(filteredArr);
    const newChecked = check.filter((_, i) => i !== index);
    setCheck(newChecked);
    const newCompleted = completed.filter((_, i) => i !== index);
        setCompleted(newCompleted);
  }
  function handleCheck(index){
  const newCheck=check.map((c,i)=>(index==i?!c:c));
   setCheck(newCheck);
  }
  function handleAdd(){
    setArrcpy([...arrcpy,input]);
    setCheck([...check,false]);
    setIsEditing([...isEditing,false]);
    setInput('');
    setCompleted([...completed, false]);
  }

  function handleEdit(index) {
    setIsEditing(isEditing.map((edit, i) => (i === index ? true : edit)));
    setEditValue(arrcpy[index]);
   }
  
  function handleSave(index) {
    const newArr = arrcpy.map((item, i) => (i === index ? editValue : item));
    setArrcpy(newArr);
    setIsEditing(isEditing.map((edit, i) => (i === index ? false : edit)));
  }

  function handleCompletion(index) {
    const newCompleted = completed.map((c, i) => (i === index ? !c : c));
     setCompleted(newCompleted);
   }
  
  
  return (
    <div style={{textAlign:'center'}}>
      <h1>Todo App</h1>
      <input type="text" onChange={(e)=>setInput(e.target.value)} style={{height:'25px',width:'75%',color:'orange',padding:'4px',onFocus:'1px solid orange'}} value={input}/>
      <button onClick={handleAdd} style={{backgroundColor:'orange',padding:'4.5px'}}>➕</button>
      {arrcpy.length>0?
      <div style={{textAlign:'justify'}}>
      <ul style={{listStyleType:'none'}}>
      {arrcpy.map((item,i)=>(
        <li style={{padding:'1em',borderBottom:'1.5px Solid orange',wordWrap:'break-word',textDecoration:completed[i]?'line-through':'none'}} key={i}><input type="checkbox" onChange={()=>{handleCheck(i)}} checked={check[i]}></input>
        {isEditing[i] ? (
     <input type="text" value={editValue}
 onChange={(e)=>setEditValue(e.target.value)} onBlur={() => handleSave(i)} autoFocus style={{width:'10em'}}/>) : (
  <span>{item}</span>)}                      
  {check[i]&&(
     <>
        <span style={{ cursor: 'pointer', marginLeft: '6px',float:'right'}} onClick={() => handleEdit(i)} >✏️</span>
        <span style={{cursor:'pointer',float:'right'}}onClick={()=>handleClick(i)}>❌</span>
        <span style={{ cursor: 'pointer', marginRight: '6px',float:'right'}} onClick={() => handleCompletion(i)}>✅
 </span>
        </>)}</li>
      ))}</ul>
      </div>:<div><h2 style={{color:'grey',marginTop:'8rem',lineHeight:'2.5rem'}}>oops..!!<br/>Empty List🫗</h2></div>}
    </div>
  );
}
