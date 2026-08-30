import  './HistoryControls.css';

const HistoryControls = ({
  typeFilter, setTypeFilter,
  roleFilter, setRoleFilter,
  statusFilter, setStatusFilter,
}) => {

  return (
    <div className='historyControls'>

        <div className="filterHeading">
            <h5>Filters</h5>
        </div>

        <div className="actualControls">
            <select value={typeFilter} id='types' onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">All Types</option>
                <option value="technical">Technical</option>
                <option value="behavioural">Behavioural</option>
                <option value="mixed">Mixed</option>
            </select>

            <select id="roles" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="frontendDeveloper">Frontend Developer</option>
                <option value="reactDeveloper">React Developer</option>
                <option value="backendDeveloper">Backend Developer</option>
                <option value="fullStackDeveloper">Full Stack Developer</option>
                <option value="softwareEngineer">Software Engineer</option>
                <option value="javaScriptDeveloper">JavaScript Developer</option>
                <option value="mobileAppDeveloper">Mobile App Developer</option>
                <option value="devOpsEngineer">DevOps Engineer</option>
                <option value="dataAnalyst">Data Analyst</option>
                <option value="dataScientist">Data Scientist</option>
                <option value="UI/UXDesigner">UI/UX Designer</option>
            </select>

            <select id="all" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="stoped">Terminated</option>
            </select>
        </div>

    </div>
  )
}

export default HistoryControls