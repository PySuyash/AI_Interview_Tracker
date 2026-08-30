import './Stats.css';
import {
  UserCheck,
  ChartColumn,
  ClockFading,
  Flame,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Total Interviews',
    value: '12',
    description: 'from last month',
    change: 3,
    changeUnit: '',
    icon: UserCheck,
  },
  {
    id: 2,
    title: 'Average Score',
    value: '78%',
    description: 'from last month',
    change: 6,
    changeUnit: '%',
    icon: ChartColumn,
  },
  {
    id: 3,
    title: 'Practice Time',
    value: '8h 32m',
    description: 'this month',
    change: 2,
    changeUnit: 'h',
    icon: ClockFading,
  },
  {
    id: 4,
    title: 'Current Streak',
    value: '5 Days',
    description: 'Keep your momentum going!',
    change: 0,
    changeUnit: '',
    icon: Flame,
  },
];

const StatsCard = ({ statsData = stats }) => {
  return (
    <section className="statsGrid">
      {statsData.map((stat) => {
        const Icon = stat.icon;

        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;
        const isNeutral = stat.change === 0;

        const TrendIcon = isPositive
          ? TrendingUp
          : isNegative
          ? TrendingDown
          : Minus;

        return (
          <article className="statsCard" key={stat.id}>

            {/* Card Header */}
            <header className="statsCardHeader">
              <div className="statsIcon">
                <Icon size={22} strokeWidth={2} />
              </div>

              <span className="statsLabel">
                {stat.title}
              </span>
            </header>

            {/* Main Value */}
            <div className="statsCardBody">
              <h3 className="statsValue">
                {stat.value}
              </h3>

              {/* Context / Trend */}
              <div
                className={`statsContext ${
                  isPositive
                    ? 'positive'
                    : isNegative
                    ? 'negative'
                    : 'neutral'
                }`}
              >
                <TrendIcon size={15} strokeWidth={2.5} />

                {isPositive && '+'}
                {isNegative && '-'}
                
                {Math.abs(stat.change)}
                {stat.changeUnit}

                <span className="statsDescription">
                  {stat.description}
                </span>
              </div>
            </div>

          </article>
        );
      })}
    </section>
  );
};

export default StatsCard;