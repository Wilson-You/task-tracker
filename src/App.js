 import {useState, useEffect} from 'react'
 import {BrowserRouter as Router, Route} from 'react-router-dom'
 import Header from './components/Header'
 import Tasks from './components/Tasks'
 import AddTask from './components/AddTask'
 import Footer from './components/Footer'
 import About from './components/About'

 function App() {
   const [showAddTask, setShowAddTask] = useState(false)
   const [tasks, setTasks] = useState([])

   useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      setTasks(data)
    }
   
    fetchTasks()
   }, [ ])

   //fetch data from the server
   const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
 //add a task to the server
   const addTask = async task => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
   }
 //delete a task from the server
   const deleteTask = async id =>{
     await fetch(`http://localhost:5000/tasks/${id}`, {
       method: 'DELETE'
     })
    setTasks(tasks.filter(task => task.id!==id))
   }
 //toggle the reminder status  
   const toggleReminer = async id => {
     const taskToToggle = await fetchTask(id)
     const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

     const res = await fetch(`http://localhost:5000/tasks/${id}`, {
       method: 'PUT',
       headers: {
         'Content-type': 'application/json'
       },
       body: JSON.stringify(updTask)
     })

     console.log('res', res);

     const data = await res.json()

     setTasks(tasks.map(task => task.id === id ? {...task, reminder:data.reminder} : task))
   }
  return (
    <Router>
    <div className="container">
      <Header title={'Task Tracker'} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
      <Route path='/' exact render={(props) => (
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle={toggleReminer}/> : <p className='prop'>No Task to Show</p>}
        </>
      )}/>
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router> 
  );
}

export default App;
