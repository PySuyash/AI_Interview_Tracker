import './InterviewConfiguration.css';
import { useState, useEffect } from 'react';
import {SquareCode, MessagesSquare, BotMessageSquare} from 'lucide-react'

const InterviewConfiguration = () => {

    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
      const interviewConfig = {
        interviewType: selectedType,
      }
    
      localStorage.setItem('currentInterview', JSON.stringify(interviewConfig));
    }, [selectedType]);
    

    function handleSelectedType(type) {
        setSelectedType(selectedType === type ? null : type);
    }

  return (
    <div className="InterviewConfiguration">

        <div className={`TechnicalInterview ${selectedType === 'Technical Interview' ? 'selected' : ''}`} onClick={() => handleSelectedType('Technical Interview')}>
            <SquareCode size={30} style={{color: '#f8fafc'}}/>
            <h4>Technical Interview</h4>
            <p>Test your technical knowledge and problem-solving skills</p>
        </div>

        <div className={`BehavioralInterview ${selectedType === 'Behavioral Interview' ? 'selected' : ''}`} onClick={() => handleSelectedType('Behavioral Interview')}>
            <MessagesSquare size={30} style={{color: '#f8fafc'}}/>
            <h4>Behavioral Interview</h4>
            <p>Practice communication and behavioral questions</p>
        </div>

        <div className={`MixedInterview ${selectedType === 'Mixed Interview' ? 'selected' : ''}`} onClick={() => handleSelectedType('Mixed Interview')}>
            <BotMessageSquare size={30} style={{color: '#f8fafc'}}/>
            <h4>Mixed Interview</h4>
            <p>A combination of technical and behavioral questions</p>
        </div>

    </div>
  )
}

export default InterviewConfiguration
