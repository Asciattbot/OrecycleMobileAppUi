import React, { useState } from 'react';
import { Home, TrendingUp, BarChart3, User, Package, Truck, Recycle, Plus, MapPin, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import orecycleLogo from "figma:asset/e6a4f290b2a77e5720710b9eb272b738565066f3.png";

// Color palette extracted from the ORecycle logo
const COLORS = {
  primary: '#2D7A2E',
  primaryLight: '#4CAF50',
  primaryLighter: '#81C784',
  background: '#F5F5F5',
  white: '#FFFFFF',
  gray: '#E0E0E0',
  darkText: '#212121',
  lightText: '#757575'
};

type Screen = 'splash' | 'login' | 'signup' | 'roleSelection' | 'dashboard' | 'addWaste' | 'marketplace' | 'logistics' | 'impact' | 'profile';
type UserRole = 'producer' | 'transporter' | 'recycler' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLogin, setIsLogin] = useState(true);

  // Simulate splash screen timeout
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('login'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
      case 'signup':
        return <AuthScreen isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} onSuccess={() => setCurrentScreen('roleSelection')} />;
      case 'roleSelection':
        return <RoleSelectionScreen onRoleSelect={(role) => { setUserRole(role); setCurrentScreen('dashboard'); }} />;
      case 'dashboard':
        return <DashboardScreen userRole={userRole} onNavigate={setCurrentScreen} />;
      case 'addWaste':
        return <AddWasteScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'marketplace':
        return <MarketplaceScreen onNavigate={setCurrentScreen} />;
      case 'logistics':
        return <LogisticsScreen onNavigate={setCurrentScreen} />;
      case 'impact':
        return <ImpactScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative">
        {renderScreen()}
      </div>
    </div>
  );
}

// 1️⃣ Splash Screen
function SplashScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-8" style={{ backgroundColor: COLORS.background }}>
      <div className="mb-12">
        <img src={orecycleLogo} alt="ORecycle Logo" className="w-64 h-auto" />
      </div>
      <p className="text-center text-xl px-6" style={{ color: COLORS.primary }}>
        Transforming waste into sustainable opportunities
      </p>
    </div>
  );
}

// 2️⃣ Login / Sign Up Screen
interface AuthScreenProps {
  isLogin: boolean;
  onToggle: () => void;
  onSuccess: () => void;
}

function AuthScreen({ isLogin, onToggle, onSuccess }: AuthScreenProps) {
  return (
    <div className="h-screen flex flex-col px-6 py-8" style={{ backgroundColor: COLORS.background }}>
      <div className="flex justify-center mb-12 mt-8">
        <img src={orecycleLogo} alt="ORecycle Logo" className="w-48 h-auto" />
      </div>
      
      <div className="flex-1">
        <h1 className="text-3xl mb-8" style={{ color: COLORS.darkText }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        
        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none"
          />
          
          <button
            onClick={onSuccess}
            className="w-full py-4 rounded-xl text-white transition-all hover:shadow-lg mt-6"
            style={{ backgroundColor: COLORS.primary }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
          
          <button
            onClick={onToggle}
            className="w-full py-2 text-center"
            style={{ color: COLORS.primary }}
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 3️⃣ Role Selection Screen
interface RoleSelectionScreenProps {
  onRoleSelect: (role: UserRole) => void;
}

function RoleSelectionScreen({ onRoleSelect }: RoleSelectionScreenProps) {
  const roles = [
    { id: 'producer', title: 'Waste Producer', icon: Package, color: COLORS.primary, description: 'I generate waste and want to recycle' },
    { id: 'transporter', title: 'Transporter', icon: Truck, color: COLORS.primaryLight, description: 'I transport waste to recyclers' },
    { id: 'recycler', title: 'Recycler', icon: Recycle, color: COLORS.primaryLighter, description: 'I recycle waste into resources' }
  ];

  return (
    <div className="h-screen flex flex-col px-6 py-8" style={{ backgroundColor: COLORS.background }}>
      <div className="flex justify-center mb-8">
        <img src={orecycleLogo} alt="ORecycle Logo" className="w-40 h-auto" />
      </div>
      
      <h1 className="text-3xl mb-3" style={{ color: COLORS.darkText }}>
        Select Your Role
      </h1>
      <p className="mb-8" style={{ color: COLORS.lightText }}>
        Choose the role that best describes you
      </p>
      
      <div className="space-y-4 flex-1">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => onRoleSelect(role.id as UserRole)}
              className="w-full p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all flex items-center space-x-4"
              style={{ borderLeft: `6px solid ${role.color}` }}
            >
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${role.color}20` }}>
                <Icon size={32} style={{ color: role.color }} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl mb-1" style={{ color: COLORS.darkText }}>{role.title}</h3>
                <p className="text-sm" style={{ color: COLORS.lightText }}>{role.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 4️⃣ Producer Dashboard
interface DashboardScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
}

function DashboardScreen({ userRole, onNavigate }: DashboardScreenProps) {
  const wasteData = [
    { name: 'Cardboard', value: 35, color: COLORS.primary },
    { name: 'Plastic', value: 30, color: COLORS.primaryLight },
    { name: 'Paper', value: 20, color: COLORS.primaryLighter },
    { name: 'Organic', value: 15, color: '#A5D6A7' }
  ];

  const stats = [
    { label: 'Total Waste', value: '2,450 kg', icon: Package },
    { label: 'CO₂ Saved', value: '1,230 kg', icon: TrendingUp },
    { label: 'Revenue', value: '15,400 DZD', icon: BarChart3 }
  ];

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="p-6 rounded-b-3xl" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white opacity-90 text-sm">Good morning,</p>
            <h2 className="text-white text-2xl">Producer Dashboard</h2>
          </div>
          <img src={orecycleLogo} alt="Logo" className="w-12 h-12" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-md">
                <Icon size={20} style={{ color: COLORS.primary }} className="mb-2" />
                <p className="text-xs mb-1" style={{ color: COLORS.lightText }}>{stat.label}</p>
                <p className="text-sm" style={{ color: COLORS.darkText }}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Waste Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-xl mb-4" style={{ color: COLORS.darkText }}>Waste Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={wasteData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {wasteData.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm" style={{ color: COLORS.lightText }}>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <button
          onClick={() => onNavigate('addWaste')}
          className="w-full py-4 rounded-xl text-white shadow-lg flex items-center justify-center space-x-2"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Plus size={24} />
          <span className="text-lg">Add Waste</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}

// 5️⃣ Add Waste Form
interface AddWasteScreenProps {
  onBack: () => void;
}

function AddWasteScreen({ onBack }: AddWasteScreenProps) {
  const [wasteType, setWasteType] = useState('cardboard');
  const [quantity, setQuantity] = useState('');
  const [fillLevel, setFillLevel] = useState(50);

  const wasteTypes = [
    { id: 'cardboard', label: 'Cardboard', icon: '📦' },
    { id: 'plastic', label: 'Plastic', icon: '♻️' },
    { id: 'paper', label: 'Paper', icon: '📄' },
    { id: 'organic', label: 'Organic', icon: '🌱' }
  ];

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="p-6 rounded-b-3xl" style={{ backgroundColor: COLORS.primary }}>
        <button onClick={onBack} className="text-white mb-4">← Back</button>
        <h2 className="text-white text-2xl">Add Waste</h2>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <label className="block mb-3 text-sm" style={{ color: COLORS.lightText }}>Waste Type</label>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {wasteTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setWasteType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all ${wasteType === type.id ? 'shadow-md' : ''}`}
                style={{
                  borderColor: wasteType === type.id ? COLORS.primary : COLORS.gray,
                  backgroundColor: wasteType === type.id ? `${COLORS.primary}10` : COLORS.white
                }}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="text-sm" style={{ color: COLORS.darkText }}>{type.label}</div>
              </button>
            ))}
          </div>

          <label className="block mb-2 text-sm" style={{ color: COLORS.lightText }}>Estimated Quantity (kg)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none mb-6"
          />

          <label className="block mb-3 text-sm" style={{ color: COLORS.lightText }}>Fill Level: {fillLevel}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={fillLevel}
            onChange={(e) => setFillLevel(Number(e.target.value))}
            className="w-full mb-6"
            style={{ accentColor: COLORS.primary }}
          />

          <button
            className="w-full py-4 rounded-xl text-white shadow-lg"
            style={{ backgroundColor: COLORS.primary }}
          >
            Submit Waste
          </button>
        </div>
      </div>
    </div>
  );
}

// 6️⃣ Waste Marketplace
interface MarketplaceScreenProps {
  onNavigate: (screen: Screen) => void;
}

function MarketplaceScreen({ onNavigate }: MarketplaceScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const listings = [
    { id: 1, type: 'Cardboard', quantity: '500 kg', location: 'Algiers', price: '2,500 DZD', icon: '📦', color: COLORS.primary },
    { id: 2, type: 'Plastic', quantity: '300 kg', location: 'Oran', price: '3,000 DZD', icon: '♻️', color: COLORS.primaryLight },
    { id: 3, type: 'Paper', quantity: '450 kg', location: 'Constantine', price: '1,800 DZD', icon: '📄', color: COLORS.primaryLighter },
    { id: 4, type: 'Organic', quantity: '200 kg', location: 'Algiers', price: '1,000 DZD', icon: '🌱', color: '#A5D6A7' }
  ];

  const filters = ['All', 'Cardboard', 'Plastic', 'Paper', 'Organic'];

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="p-6 rounded-b-3xl" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl">Waste Marketplace</h2>
          <img src={orecycleLogo} alt="Logo" className="w-10 h-10" />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex space-x-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter.toLowerCase())}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedFilter === filter.toLowerCase() ? 'text-white shadow-md' : 'bg-white'
            }`}
            style={{
              backgroundColor: selectedFilter === filter.toLowerCase() ? COLORS.primary : COLORS.white,
              color: selectedFilter === filter.toLowerCase() ? COLORS.white : COLORS.darkText
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{listing.icon}</div>
                  <div>
                    <h3 className="text-lg mb-1" style={{ color: COLORS.darkText }}>{listing.type}</h3>
                    <p className="text-sm mb-2" style={{ color: COLORS.lightText }}>{listing.quantity}</p>
                    <div className="flex items-center space-x-1 text-sm" style={{ color: COLORS.primary }}>
                      <MapPin size={14} />
                      <span>{listing.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg" style={{ color: COLORS.primary }}>{listing.price}</p>
                  <button
                    className="mt-2 px-4 py-2 rounded-lg text-white text-sm"
                    style={{ backgroundColor: listing.color }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="marketplace" onNavigate={onNavigate} />
    </div>
  );
}

// 7️⃣ Logistics Optimization
interface LogisticsScreenProps {
  onNavigate: (screen: Screen) => void;
}

function LogisticsScreen({ onNavigate }: LogisticsScreenProps) {
  const routes = [
    { from: 'Algiers', to: 'Oran', distance: '432 km', cost: '5,200 DZD', efficiency: 95 },
    { from: 'Oran', to: 'Constantine', distance: '628 km', cost: '7,500 DZD', efficiency: 92 },
    { from: 'Constantine', to: 'Annaba', distance: '211 km', cost: '2,800 DZD', efficiency: 98 }
  ];

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="p-6 rounded-b-3xl" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl">Logistics</h2>
          <img src={orecycleLogo} alt="Logo" className="w-10 h-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Map Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6 relative overflow-hidden" style={{ height: '200px' }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${COLORS.primaryLighter}20` }}>
            <div className="text-center">
              <MapPin size={48} style={{ color: COLORS.primary }} className="mx-auto mb-2" />
              <p style={{ color: COLORS.darkText }}>Route Map View</p>
              <p className="text-sm mt-1" style={{ color: COLORS.lightText }}>Routes optimized automatically</p>
            </div>
          </div>
        </div>

        {/* Route Cards */}
        <h3 className="text-xl mb-4" style={{ color: COLORS.darkText }}>Optimized Routes</h3>
        <div className="space-y-4">
          {routes.map((route, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Truck size={20} style={{ color: COLORS.primary }} />
                  <span style={{ color: COLORS.darkText }}>{route.from} → {route.to}</span>
                </div>
                <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${COLORS.primary}20`, color: COLORS.primary }}>
                  {route.efficiency}% efficient
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: COLORS.lightText }}>Distance</p>
                  <p style={{ color: COLORS.darkText }}>{route.distance}</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: COLORS.lightText }}>Cost</p>
                  <p style={{ color: COLORS.darkText }}>{route.cost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="logistics" onNavigate={onNavigate} />
    </div>
  );
}

// 8️⃣ Environmental Impact & Statistics
interface ImpactScreenProps {
  onNavigate: (screen: Screen) => void;
}

function ImpactScreen({ onNavigate }: ImpactScreenProps) {
  const monthlyData = [
    { month: 'Jan', recycled: 400, co2: 200 },
    { month: 'Feb', recycled: 600, co2: 300 },
    { month: 'Mar', recycled: 800, co2: 400 },
    { month: 'Apr', recycled: 1000, co2: 500 },
    { month: 'May', recycled: 1200, co2: 600 },
    { month: 'Jun', recycled: 1400, co2: 700 }
  ];

  const impactStats = [
    { label: 'Total Recycled', value: '5,400 kg', icon: '♻️', color: COLORS.primary },
    { label: 'CO₂ Reduced', value: '2,700 kg', icon: '🌍', color: COLORS.primaryLight },
    { label: 'Trees Saved', value: '45 trees', icon: '🌳', color: COLORS.primaryLighter }
  ];

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="p-6 rounded-b-3xl" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl">Environmental Impact</h2>
          <img src={orecycleLogo} alt="Logo" className="w-10 h-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {impactStats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-md text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-xs mb-1" style={{ color: COLORS.lightText }}>{stat.label}</p>
              <p className="text-sm" style={{ color: COLORS.darkText }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Monthly Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-xl mb-4" style={{ color: COLORS.darkText }}>Monthly Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray} />
              <XAxis dataKey="month" stroke={COLORS.lightText} />
              <YAxis stroke={COLORS.lightText} />
              <Tooltip />
              <Line type="monotone" dataKey="recycled" stroke={COLORS.primary} strokeWidth={3} />
              <Line type="monotone" dataKey="co2" stroke={COLORS.primaryLight} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.primary }} />
              <span className="text-sm" style={{ color: COLORS.lightText }}>Recycled (kg)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.primaryLight }} />
              <span className="text-sm" style={{ color: COLORS.lightText }}>CO₂ Saved (kg)</span>
            </div>
          </div>
        </div>

        {/* Circular Economy Indicator */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl mb-4" style={{ color: COLORS.darkText }}>Circular Economy Score</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r="56" stroke={COLORS.gray} strokeWidth="8" fill="none" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={COLORS.primary}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56 * 0.87} ${2 * Math.PI * 56}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl" style={{ color: COLORS.primary }}>87%</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm" style={{ color: COLORS.lightText }}>
            Your contribution to the circular economy is excellent!
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="impact" onNavigate={onNavigate} />
    </div>
  );
}

// 9️⃣ Profile & Settings
interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const activities = [
    { action: 'Waste submitted', type: 'Cardboard 200kg', date: 'Dec 20, 2024' },
    { action: 'Revenue earned', type: '2,500 DZD', date: 'Dec 18, 2024' },
    { action: 'Waste submitted', type: 'Plastic 150kg', date: 'Dec 15, 2024' }
  ];

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="p-6 rounded-b-3xl" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl">Profile</h2>
          <img src={orecycleLogo} alt="Logo" className="w-10 h-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* User Info */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.primary }}>
              <User size={32} color="white" />
            </div>
            <div>
              <h3 className="text-xl" style={{ color: COLORS.darkText }}>John Doe</h3>
              <p className="text-sm" style={{ color: COLORS.lightText }}>Waste Producer</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: COLORS.gray }}>
            <div className="text-center">
              <p className="text-2xl mb-1" style={{ color: COLORS.primary }}>24</p>
              <p className="text-xs" style={{ color: COLORS.lightText }}>Submissions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1" style={{ color: COLORS.primary }}>2.4T</p>
              <p className="text-xs" style={{ color: COLORS.lightText }}>Total Waste</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1" style={{ color: COLORS.primary }}>15K</p>
              <p className="text-xs" style={{ color: COLORS.lightText }}>DZD Earned</p>
            </div>
          </div>
        </div>

        {/* Activity History */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-xl mb-4" style={{ color: COLORS.darkText }}>Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3 pb-4 border-b last:border-0" style={{ borderColor: COLORS.gray }}>
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: COLORS.primary }} />
                <div className="flex-1">
                  <p style={{ color: COLORS.darkText }}>{activity.action}</p>
                  <p className="text-sm" style={{ color: COLORS.lightText }}>{activity.type}</p>
                  <p className="text-xs mt-1" style={{ color: COLORS.lightText }}>{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl mb-4" style={{ color: COLORS.darkText }}>Settings</h3>
          <div className="space-y-3">
            {['Notifications', 'Language', 'Privacy', 'Help & Support'].map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-all"
              >
                <span style={{ color: COLORS.darkText }}>{item}</span>
                <span style={{ color: COLORS.lightText }}>›</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}

// Bottom Navigation Component
interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: Screen) => void;
}

function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'marketplace', icon: Package, label: 'Market' },
    { id: 'logistics', icon: Truck, label: 'Logistics' },
    { id: 'impact', icon: BarChart3, label: 'Impact' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-lg" style={{ borderColor: COLORS.gray }}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className="flex flex-col items-center py-2 px-4 transition-all"
            >
              <Icon
                size={24}
                style={{ color: isActive ? COLORS.primary : COLORS.lightText }}
              />
              <span
                className="text-xs mt-1"
                style={{ color: isActive ? COLORS.primary : COLORS.lightText }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
