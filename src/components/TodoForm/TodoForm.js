import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './TodoForm.scss'
import get from 'lodash/get'
import HappyIcon from '../../assets/icons/happy.png'
import SadIcon from '../../assets/icons/sad.png'
import SmileIcon from '../../assets/icons/smiling.png'
import DependencyToken from '../DependencyToken'
import uniqueId from 'lodash/uniqueId'
import { getTodaysDate } from '../../utils'

function TodoForm({ addTodoItem }) {
    const [data, setData] = useState({ id: uniqueId("Todo-"), title: "", dueDate: "", duration: "", excitementLevel: "", dependencies: [] });
    const [dependencyString, setDependencyString] = useState('');
    const [dependencyArr, setDependencyArr] = useState([]);

    const handleItemChange = (e, type) => {
        const val = e.target.value
        const newData = { ...data }
        newData[type] = val;
        setData(newData);
    }

    const handleDependencies = (e) => {
        const val = e.target.value;
        setDependencyString(val);
    }

    const handleExcitementLevel = (val) => {
        const newData = { ...data }
        newData["excitementLevel"] = val;
        setData(newData);
    }

    const handleSubmit = () => {
        console.log("data", data);
        setDependencyString('')
        addTodoItem(data);
    }

    const addDependency = () => {
        const newData = { ...data }
        const currDependencies = newData['dependencies'];
        newData['dependencies'] = [...currDependencies, dependencyString];
        setDependencyArr([...dependencyArr, dependencyString])
        setDependencyString('');
        setData(newData);
    }

    const removeDependency = (index) => {
        const newData = { ...data }
        const currDependencies = newData['dependencies'];
        currDependencies.splice(index, 1);
        setDependencyArr([...currDependencies])
        newData['dependencies'] = [...currDependencies];
    }
    return (
        <div className="TodoForm">
            <div className="TodoForm__Row">
                <div className="TodoForm__Row__Item">
                    <div className="TodoForm__Row__Item__Label">Description</div>
                    <input type="text" className="TodoForm__Row__Item__Input" value={get(data, 'title', '')} onChange={(e) => handleItemChange(e, "title")} />
                </div>
            </div>
            <div className="TodoForm__Row">
                <div className="TodoForm__Row__Item">
                    <div className="TodoForm__Row__Item__Label">Due Date</div>
                    <input type="date" id="dueDate" min={getTodaysDate()} name="dueDate" value={get(data, 'dueDate', '')} onChange={(e) => handleItemChange(e, "dueDate")} />
                </div>
                <div className="TodoForm__Row__Item">
                    <div className="TodoForm__Row__Item__Label">Duration (mins)</div>
                    <input type="number" className="TodoForm__Row__Item__Input" value={get(data, 'duration', '')} onChange={(e) => handleItemChange(e, "duration")} />
                </div>
            </div>
            <div className="TodoForm__Row">
                <div className="TodoForm__Row__Item">
                    <div className="TodoForm__Row__Item__Label">Dependencies</div>
                    <div className="TodoForm__Row__Item__Wrapper">
                        <input type="text" className="TodoForm__Row__Item__Input" value={dependencyString} onChange={(e) => handleDependencies(e)} />
                        {dependencyString && dependencyString.length > 2 && <button className="TodoForm__Row__Item__AddButton" onClick={addDependency}>Add</button>}
                    </div>
                    <div className="TodoForm__Row__Item__DependencyWrapper">
                        {dependencyArr.map((item, index) => {
                            return <DependencyToken key={`Dep-${index}`} text={item} isEditable={true} onClick={() => removeDependency(index)} />
                        })}
                    </div>
                </div>
            </div>
            <div className="TodoForm__Row">
                <div className="TodoForm__Row__Item">
                    <div className="TodoForm__Row__Item__Label">Excitement Level</div>
                    <div className='TodoForm__Row__Item__ExcitementLevel'>
                        <img src={SadIcon} onClick={() => handleExcitementLevel("LOW")}
                            className={`TodoForm__Row__Item__ExcitementLevel__Item ${get(data, 'excitementLevel') === 'LOW' && 'Selected'}`} />
                        <img src={HappyIcon} onClick={() => handleExcitementLevel("MEDIUM")}
                            className={`TodoForm__Row__Item__ExcitementLevel__Item ${get(data, 'excitementLevel') === 'MEDIUM' && 'Selected'}`} />
                        <img src={SmileIcon} onClick={() => handleExcitementLevel("HIGH")}
                            className={`TodoForm__Row__Item__ExcitementLevel__Item ${get(data, 'excitementLevel') === 'HIGH' && 'Selected'}`} />
                    </div>
                </div>
            </div>
            <div className="TodoForm__Row Center">
                <button onClick={handleSubmit} className="TodoForm__Row__Item__SubmitButton">Create Task</button>
            </div>
        </div>
    )
}

TodoForm.propTypes = {
    addTodoItem: PropTypes.func
}

TodoForm.defaultProps = {
    addTodoItem: () => { }
}

export default TodoForm

