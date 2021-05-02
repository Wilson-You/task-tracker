import {useState} from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    
    const submit = e => {
        e.preventDefault()
        if(!text){
            alert('Please enter a value')
            return
        }

        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={submit}>
            <div className='form-control'>
                <label htmlFor='addtask'>Task</label>
                <input type="text" id='addtask'placeholder='add task' value={text} onChange={e => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label htmlFor='datetime'>Date & Time</ label>
                <input type="text" id='datetime' placeholder='add date and time' value={day} onChange={e => setDay(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label className='set-reminder' htmlFor='check'>Set Reminder</label>
                <input className='checkbox' 
                type="checkbox" id='check' checked={reminder} value={reminder} onChange={e => setReminder(e.currentTarget.checked)}/>
            </div>
            <input type="submit" value='Save'/>
        </form>
    )
}

export default AddTask
