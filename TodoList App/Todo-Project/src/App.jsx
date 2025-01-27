import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
//added this random uuid generator from "https://www.npmjs.com/package/uuid"
import { v4 as uuidv4 } from 'uuid';
//adding this for icons from this rect-icon link->"https://react-icons.github.io/react-icons/"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  //Ab sbse phla usestate bnega apna jo text line mai use hua hai "todo" naam ka 
  //ye hmara vo todo hai jo hum edit kar rhe hia ya likh rhe hai
  const [todo, setTodo] = useState("") //ye basically ek input text liye bnaya hua state hai
  const [todos, setTodos] = useState([])  //or ye todos ka state hai jo hmara array hoga jisme hmare sare todos honge

  const [showFinished, setshowFinished] = useState(true)

  //Ye useEffect ek baar chlega or hmare saare todos ko load karega
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }  //Null nhi hai to ye if vala statement chlega
  }, []) //or hai tpo kahli chod dega 
  

//ab mai nhi chahta ki records save karne ke baad refresh maar ke mera sab udd jaye to uske liye ek local storage ka use karunga
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


const toggleFinished =() => {
  setshowFinished(!showFinished)

  
}




  // Ab sabse phle button par lgaye hue events handle karte hai
  const handleMyEdit =(e,id)=>{
    let t=todos.filter(i=>i.id ===id)
    setTodo(t[0].todo)
    //Ab ek baar set hone ke baad delete vala func bhi yhi chla dunga
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleMyDelete =(e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
    
  }
  
  const handleMyAdd =()=>{
    setTodos ([...todos, {id: uuidv4(), todo, isCompleted : false}])
    setTodo("")   //ab agar mai text-field mai kuch likha or add par click kiya to value add hoke text field vapis empty hoga
    saveToLS()

    
  }
  
  const handleMyChange =(e)=>{
    setTodo(e.target.value)
  }

  //There is a shortcut snippet called "anfn"(anonymys function)
  const handleMyCheckbox=(e) => {
    let id =e.target.name;
    let index = todos.findIndex(item =>{  
      return item.id ===id;  //ye kiya to index value mil jayegi
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;  //mtlab agar hmara todo true hai to false ho jaye or false hai to true...mtlba todo comple hai to uncomplete and vice-versa
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh] md:w-[35%]">
      
      <h1 className="font-bold text-center text-3xl">iTask - Manage Your Todos At One Place</h1>

      <div className="addtodo my-5 flex flex-col gap-4"> {/** Yha "my" means ye gap hai box ke upar ki line oe "Add a todo" text ke bich ki*/}

      <h2 className="text-2xl font-bold">Add Your Todo</h2>
      {/* Ab ek form bnate hai add a todo ke andar */}
    <div className="flex">
      <input onChange={handleMyChange} value={todo} type ="text" className='w-full rounded-full px-5 py-1' /> {/** Yha vo jo text vala box hai uskp styling karne ka process chalu hai*/}

      <button onClick={handleMyAdd} disabled={todo.length<3} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-2 px-2 py-3 mx-2 text-sm font-bold text-white rounded-full">Save</button>           {/**Ab add a todo ke baad ek form bnaya jiske baju mai ek button "Add" kiya */}
      </div>
      </div>
      <input className="my-4" onChange={toggleFinished} type ="checkbox" checked ={showFinished}/>
      <label className="mx-2" htmlFor="show"> Show Finished</label>
      <div className="h-[1px] bg-black opacity-20 w-3/4 my-2 mx-auto"></div>

          <h2 className="text-2xl font-bold">Your Todos</h2>

          
        {/* Ab upar add or Your Todos or ek text type dene ke baad idhar niche ek "todos","todo","button" ki class bnake uske andar 2 button add kar denge  */}
          <div className="todos"> 
            {todos.length===0 && <div className="m-5">No Todos to display</div>}

            {todos.map(item=>{

           return(showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3 ">

                <div className="flex gap-5">
                <input name={item.id} onChange={handleMyCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted? "line-through" : "" }>{item.todo}</div>  {/** Basically ye ek text class hai jiske baju mai edit or delete ka button add hoga*/}
                </div>

              <div className="buttons flex h-full"> 
                <button onClick={(e)=>handleMyEdit(e,item.id)} className="bg-violet-800 hover:bg-violet-950 p-7 px-2 py-1 text-sm font-bold text-white rounded-md mx-1"><FaEdit /></button>  {/** Upar ka "Add" button bnane mai jo jo tailwind classes use hui hai vhi yha ke 2 buttons par bhi kar di*/}
                <button onClick={(e)=>{handleMyDelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-7 px-2 py-1 text-sm font-bold text-white rounded-md mx-1"><MdDelete /></button> {/** Upar ka "Add" button bnane mai jo jo tailwind classes use hui hai vhi yha ke 2 buttons par bhi kar di*/}

              </div>

            </div>
             })}
          </div>

        </div>
    </>
  )
}

export default App
