import React from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store/store'



const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <div className="min-h-screen bg-[#355676] text-[#E6D5B8]">
      {/* Hero Section */}
      <section
        className="relative py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?finance,technology')" }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Amar Wallet for Modern Banking
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Send, receive, and manage your money securely. Fast, convenient, and trusted by thousands.
          </p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-[#E6D5B8] text-[#355676] px-8 py-3 rounded-lg font-semibold shadow-md 
                             hover:bg-[#C8A978] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                             focus:ring-[#C8A978] transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-[#E6D5B8] text-[#E6D5B8] px-8 py-3 rounded-lg font-semibold 
                             hover:bg-[#C8A978] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                             focus:ring-[#C8A978] transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/user/dashboard"
                className="bg-[#E6D5B8] text-[#355676] px-8 py-3 rounded-lg font-semibold shadow-md 
                           hover:bg-[#C8A978] hover:text-white transition-all duration-300"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#355676] text-[#E6D5B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Amar Wallet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: '⚡', title: 'Instant Transfers', desc: 'Send and receive money instantly to anyone, anywhere.' },
              { icon: '🔒', title: 'Bank-Level Security', desc: 'Your money and data are protected with advanced security.' },
              { icon: '💼', title: 'Easy Management', desc: 'Manage your finances with our intuitive, user-friendly interface.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur-md hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#2D4754]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          {[
            { value: '500+', label: 'Active Users' },
            { value: '৳1M+', label: 'Transactions' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
          ].map((stat, idx) => (
            <div key={idx}>
              <h3 className="text-4xl font-bold text-[#E6D5B8] mb-2">{stat.value}</h3>
              <p className="text-[#C8A978]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#355676] text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of satisfied users who trust Amar Wallet for their financial needs.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="bg-[#E6D5B8] text-[#355676] px-10 py-4 rounded-lg font-semibold shadow-md 
                       hover:bg-[#C8A978] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-[#C8A978] transition-all duration-300"
          >
            Create Account
          </Link>
        )}
      </section>
      {/* Services Section */}
<section className="py-20 bg-[#2D4754] text-[#E6D5B8]">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-12">Our Core Services</h2>
    <div className="grid md:grid-cols-4 gap-8">
      {[
        'Money Transfer',
        'Cash In',
        'Cash Out',
        'Agent Payments',
      ].map((service, i) => (
        <div
          key={i}
          className="bg-white/10 p-6 rounded-xl hover:scale-105 transition"
        >
          <h3 className="font-semibold text-lg">{service}</h3>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  )
}

export default Home
