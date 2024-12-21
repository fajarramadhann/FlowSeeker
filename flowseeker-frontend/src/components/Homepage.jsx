import React from 'react';
import { Briefcase, Percent, Target } from 'lucide-react';
import Button from './ui/Button';

const HomePage = () => {
  // Mock data - replace with real data later
  const stats = {
    totalScore: '1 Applicants',
    wins: '138',
    winRate: '48.94%',
    winStreak: '1'
  };

  const recentApplications = [
    {
      company: 'TechCorp',
      status: 'PENDING',
      timeAgo: '1H',
      salary: '$0.4121',
      change: '-2.46%'
    },
    {
      company: 'StartupX',
      status: 'INTERVIEW',
      timeAgo: '4H',
      salary: '$0.4121',
      change: '-2.14%'
    }
  ];

  return (
    <div className="flex flex-col p-2 gap-6 pb-24">
    
      {/* Score Card */}
      <div className="bg-main rounded-base p-6 border-2 border-black shadow-light">
        <h2 className="text-sm">Your Total Applicants</h2>
        <div className="text-xl font-heading">{stats.totalScore}</div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-bg rounded-base p-4 border-2 border-black">
            <div className="text-sm">Wins</div>
            <div className="text-xl font-heading">{stats.wins}</div>
          </div>
          <div className="bg-bg rounded-base p-4 border-2 border-black">
            <div className="text-sm">Win Rate</div>
            <div className="text-xl font-heading">{stats.winRate}</div>
          </div>
          <div className="bg-bg rounded-base p-4 border-2 border-black">
            <div className="text-sm">Streak</div>
            <div className="text-xl font-heading">{stats.winStreak}</div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="space-y-4">
        <h2 className="text-2xl font-heading">Your Applications</h2>
        {recentApplications.map((app, index) => (
          <div 
            key={index}
            className="bg-bg rounded-base p-4 border-2 border-black shadow-light"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading">{app.company}</span>
                  <span className={`text-sm ${
                    app.status === 'PENDING' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{app.timeAgo}</div>
              </div>
              <div className="text-right">
                <div className="font-heading">{app.salary}</div>
                <div className="text-sm text-red-500">{app.change}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button 
        onClick={() => console.log('New application')}
        className="mt-4 bg-mainAccent text-white font-heading"
      >
        <Briefcase className="mr-2" />
        Apply for New Job
      </Button>
    </div>
  );
};

export default HomePage;