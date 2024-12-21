import { Home, Compass, User } from 'lucide-react';
import { useState } from 'react';

const Bottomnav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'discovery', icon: Compass },
    { id: 'profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center w-full p-4">
      <nav className="bg-white rounded-full px-8 py-3 border-2 border-black shadow-light max-w-60 w-full">
        <div className="flex justify-between items-center">
          {navItems.map(({ id, icon: Icon }) => (
            <div
              key={id}
              onClick={() => setActiveTab(id)}
              className="cursor-pointer group"
            >
              <Icon 
                size={28} 
                className={`
                  transition-all duration-300 
                  ${activeTab === id 
                    ? 'text-black stroke-[2]' 
                    : 'text-text dark:text-darkText stroke-1.2 opacity-40'
                  }
                `}
              />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Bottomnav;