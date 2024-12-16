import { Home, Compass, User } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

const Bottomnav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discovery', icon: Compass, label: 'Discovery' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg dark:bg-darkBg p-2 border-t-2 border-black">
      <div className="max-w-sm mx-auto flex justify-between items-center">
        {navItems.map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`
              flex flex-col items-center gap-1
              ${activeTab === id 
                ? 'bg-main' 
                : 'bg-bg dark:bg-darkBg hover:bg-main/80'}
            `}
          >
            <Icon 
              size={30} 
              className={activeTab === id ? 'text-black' : 'text-text dark:text-darkText'}
            />
            <span 
              className={`text-sm font-base
                ${activeTab === id ? 'text-black' : 'text-text dark:text-darkText'}
              `}
            >
              {label}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Bottomnav;