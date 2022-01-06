import React from 'react'
import PropTypes from 'prop-types'
import './TodoItem.scss';
import CheckMarkIcon from '../../assets/icons/check-mark.png'
import HappyIcon from '../../assets/icons/happy.png'
import SadIcon from '../../assets/icons/sad.png'
import SmileIcon from '../../assets/icons/smiling.png'
import TimeIcon from '../../assets/icons/time.png'
import DurationIcon from '../../assets/icons/clock-time.png'
import DependencyToken from '../DependencyToken';
import { isTouchFriendly } from '../../utils';

const device = isTouchFriendly ? 'Mobile' : 'Desktop'

const getEmotion = (emotion) => {
    switch (emotion) {
        case "LOW": return SadIcon;
        case "MEDIUM": return HappyIcon;
        case "HIGH": default: return SmileIcon;
    }
}


function TodoItem({ id, title, isCompleted, onSelect, duration, excitementLevel, dueDate, dependencies }) {
    return (
        <div className={`TodoItem ${isCompleted && 'Completed'}`}>
            <div className="TodoItem__Checkbox" onClick={() => onSelect(id, isCompleted)}>
                {isCompleted ? <img src={CheckMarkIcon} className="TodoItem__Checkbox__Img" /> : <div className="TodoItem__Checkbox__Uncheck"></div>}
            </div>
            <div className="TodoItem__Infobox">
                <div className="TodoItem__Infobox__Top">
                    <div className={`TodoItem__Infobox__Top__Title ${isCompleted && 'Completed'} ${device}`}>{title}</div>
                    <div className="TodoItem__Infobox__Top__Row">
                        <div className="TodoItem__Infobox__Top__Row__Item">
                            <img src={TimeIcon} className="TodoItem__Infobox__Top__Row__Item__Img" /><span className={`${isCompleted && 'Completed'}`}>{dueDate}</span>
                        </div>
                        <div className="TodoItem__Infobox__Top__Row__Item">
                            <img src={DurationIcon} className="TodoItem__Infobox__Top__Row__Item__Img" /><span className={`${isCompleted && 'Completed'}`}>{duration} mins</span>
                        </div>
                    </div>
                </div>
                <div className="TodoItem__Infobox__Bottom">
                    <img src={getEmotion(excitementLevel)} className="TodoItem__Infobox__Bottom__Emotion" />
                    <div className="TodoItem__Infobox__Bottom__Dependencies">
                        {dependencies && dependencies.map((item, index) => {
                            return <DependencyToken key={`Dep-${index}`} isEditable={false} text={item} />
                        })}
                    </div>
                </div>
            </div>
            <div className="TodoItem__Editbox"></div>

        </div>
    )
}

TodoItem.propTypes = {
    excitementLevel: PropTypes.oneOf(["LOW", "MEDIUM", "HIGH"]),
    id: PropTypes.string,
    title: PropTypes.string,
    isCompleted: PropTypes.bool,
    onSelect: PropTypes.func,
    duration: PropTypes.number,
    dueDate: PropTypes.string,
    dependencies: PropTypes.arrayOf(PropTypes.string)
}
TodoItem.defaultProps = {
    excitementLevel: "",
    isCompleted: false,
    onSelect: () => { },
    dependencies: []
}

export default TodoItem

