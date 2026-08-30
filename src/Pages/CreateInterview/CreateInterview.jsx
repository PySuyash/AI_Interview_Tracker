import './CreateInterview.css';
import InterviewConfiguration from '../../Components/InterviewConfigurationSection/InterviewConfiguration';
import ICForm from '../../Components/InterviewConfigurationForm/ICForm';
import Footer from '../../Components/Footer/Footer'
import { Wrench } from 'lucide-react';


const CreateInterview = () => {
  return (
    <div className='PageWrapper'>
      <header className='CreateInterviewPageHeader'>
        <span className='headerLabel'><Wrench size={24} className='WrenchIcon'/><h4>Interview Setup</h4></span>
        <h1 className='createInterviewHeaderHeading'>Create New Interview</h1>
        <p className='createInterviewHeaderPara'>Configure your interview before starting your practice session</p>
      </header>
      <div className="ICADHeading">
        <h3>Please select the type of interview</h3>
      </div>
      <InterviewConfiguration/>
      <ICForm/>
      <Footer/>
    </div>
  )
}

export default CreateInterview
