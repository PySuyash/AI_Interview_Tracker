import './IRandSP.css';

const IRandSP = ({ overallScore = 0, status = 'Not Ready', readinessMetrics = [], skillMetrics = [] }) => {
  return (
    <div className="IRandSP">
      {/* Section 1: Interview Readiness */}
      <section className="dashboard-card interviewReadiness">
        <header className="card-header">
          <h3>Interview Readiness</h3>
        </header>

        <div className="card-body">
          {/* Main Score Badge */}
          <div className="score-badge">
            <div className="score-value">{overallScore}%</div>
            <div className="score-status">{status}</div>
          </div>

          {/* Metric Progress Bars */}
          <div className="progress-list">
            {readinessMetrics.map((item, index) => (
              <div key={index} className="progress-item">
                <span className="metric-label">{item.label}</span>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ '--progress': `${item.value}%` }}
                  ></div>
                </div>
                <span className="metric-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Skill Performance */}
      <section className="dashboard-card skillPerformance">
        <header className="card-header">
          <h3>Skill Performance</h3>
        </header>

        <div className="card-body">
          {skillMetrics.length > 0 ? (
            <div className="progress-list">
              {skillMetrics.map((item, index) => (
                <div key={index} className="progress-item">
                  <span className="metric-label">{item.skill}</span>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ '--progress': `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="metric-value">{item.value}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="noSkillData">Complete an interview to see your skill breakdown here.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default IRandSP;