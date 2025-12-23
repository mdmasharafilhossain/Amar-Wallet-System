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
{/* How It Works */}
<section className="py-24 bg-gradient-to-b from-[#355676] to-[#2D4754] text-[#E6D5B8]">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        How Amar Wallet Works
      </h2>
      <p className="max-w-2xl mx-auto opacity-80">
        Get started in minutes and manage your money with confidence.
      </p>
    </div>

    {/* Steps */}
    <div className="grid md:grid-cols-3 gap-12 text-center relative">

      {[
        {
          step: '01',
          title: 'Create Account',
          desc: 'Sign up using your mobile number and verify your identity.',
        },
        {
          step: '02',
          title: 'Add Balance',
          desc: 'Add money securely from bank or supported payment methods.',
        },
        {
          step: '03',
          title: 'Send & Pay',
          desc: 'Transfer money or pay merchants instantly and safely.',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="group relative bg-white/10 backdrop-blur-md p-10 rounded-2xl 
                     shadow-lg hover:-translate-y-2 hover:shadow-2xl 
                     transition-all duration-300"
        >
          {/* Step Circle */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                          w-16 h-16 rounded-full bg-[#E6D5B8] 
                          text-[#355676] flex items-center justify-center 
                          text-xl font-bold shadow-md">
            {item.step}
          </div>

          {/* Content */}
          <h3 className="mt-8 text-xl font-semibold mb-3 group-hover:text-[#C8A978] transition-colors">
            {item.title}
          </h3>
          <p className="text-sm opacity-80">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Visual Hint */}
    <div className="mt-20 text-center text-[#C8A978] animate-pulse">
      Simple • Secure • Fast
    </div>

  </div>
</section>

{/* Security Highlights */}
<section className="py-20 bg-[#2D4754]">
  <div className="max-w-6xl mx-auto px-4 text-center text-[#E6D5B8]">
    <h2 className="text-3xl font-bold mb-10">Security You Can Trust</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        'Two-Factor Authentication',
        'Encrypted Transactions',
        'Fraud Monitoring',
      ].map((item, i) => (
        <div key={i} className="bg-white/10 p-6 rounded-xl">
          <p>{item}</p>
        </div>
      ))}
    </div>
  </div>
</section>
{/* Testimonials */}
<section className="py-24 bg-gradient-to-b from-[#355676] to-[#2D4754]">
  <div className="max-w-7xl mx-auto px-4 text-center text-[#E6D5B8]">
    
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Loved by Our Users
    </h2>
    <p className="max-w-2xl mx-auto mb-14 opacity-80">
      Thousands trust Amar Wallet for fast, secure, and seamless transactions.
    </p>

    {/* Testimonials */}
    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          name: 'Rahim Ahmed',
          role: 'Small Business Owner',
          review: 'Fast and reliable service!',
        },
        {
          name: 'Nusrat Jahan',
          role: 'Freelancer',
          review: 'Very secure and easy to use.',
        },
        {
          name: 'Tanvir Hasan',
          role: 'Online Seller',
          review: 'Best digital wallet experience.',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="group relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl 
                     hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 
                          w-12 h-12 flex items-center justify-center 
                          bg-[#E6D5B8] text-[#355676] rounded-full text-2xl shadow-md">
            “
          </div>

          {/* Review */}
          <p className="italic text-lg mb-6 mt-6 opacity-90">
            {item.review}
          </p>

          {/* User Info */}
          <div className="border-t border-white/20 pt-4">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-[#C8A978]">{item.role}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Trust Hint */}
    <div className="mt-16 text-[#C8A978] text-sm animate-pulse">
      ★★★★★ Rated by real users
    </div>

  </div>
</section>


{/* Blog Post */}
<section className="py-24 bg-gradient-to-b from-[#2D4754] to-[#355676] text-[#E6D5B8]">
  <div className="max-w-7xl mx-auto px-4 text-center">

    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Latest Updates & Insights
    </h2>
    <p className="max-w-2xl mx-auto mb-14 opacity-80">
      Stay informed with security tips, feature releases, and smart wallet usage.
    </p>

    {/* Blog Cards */}
    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: 'How to Stay Safe with Digital Wallets',
          desc: 'Best practices to protect your money and personal data online.',
          tag: 'Security',
        },
        {
          title: 'New Features Coming Soon',
          desc: 'Exciting updates designed to make your experience faster and smoother.',
          tag: 'Update',
        },
        {
          title: 'Tips for Faster Transactions',
          desc: 'Simple steps to ensure instant and hassle-free payments.',
          tag: 'Tips',
        },
      ].map((post, i) => (
        <div
          key={i}
          className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg 
                     hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-left"
        >
          {/* Tag */}
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold 
                           bg-[#E6D5B8]/20 text-[#E6D5B8] rounded-full">
            {post.tag}
          </span>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-[#C8A978] transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm opacity-80 mb-6">
            {post.desc}
          </p>

          {/* Read More */}
          
        </div>
      ))}
    </div>

    {/* View All */}
   

  </div>
</section>



{/* Partners */}
<section className="py-24 bg-gradient-to-b from-[#355676] to-[#2D4754] text-[#E6D5B8]">
  <div className="max-w-6xl mx-auto px-4 text-center">

    {/* Heading */}
    <h2 className="text-2xl md:text-3xl font-bold mb-4">
      Trusted by Industry Leaders
    </h2>
    <p className="max-w-xl mx-auto mb-14 opacity-80">
      Amar Wallet partners with reliable financial institutions and service providers.
    </p>

    {/* Partners */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
      {[
        'National Bank',
        'SecurePay Gateway',
        'Merchant Network',
        'Cloud Infrastructure',
      ].map((partner, i) => (
        <div
          key={i}
          className="group bg-white/10 backdrop-blur-md py-6 px-4 rounded-xl shadow-md 
                     hover:scale-105 transition-all duration-300"
        >
          <div className="h-12 flex items-center justify-center font-semibold opacity-90 
                          group-hover:text-[#C8A978] transition-colors">
            {partner}
          </div>
        </div>
      ))}
    </div>

    {/* Trust Metrics */}
    <div className="mt-16 flex flex-wrap justify-center gap-10 text-sm text-[#C8A978]">
      <span>✔ PCI-DSS Compliant</span>
      <span>✔ ISO Certified Security</span>
      <span>✔ 99.9% Service Reliability</span>
    </div>

  </div>
</section>

{/* Who Can USe */}
<section className="py-24 bg-gradient-to-b from-[#2D4754] to-[#355676] text-[#E6D5B8]">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Who Can Use Amar Wallet
      </h2>
      <p className="max-w-2xl mx-auto opacity-80">
        Amar Wallet is built for individuals and businesses of all sizes.
      </p>
    </div>

    {/* Use Cases */}
    <div className="grid md:grid-cols-4 gap-10 text-center">
      {[
        {
          title: 'Students',
          desc: 'Send and receive money easily for daily expenses and tuition.',
        },
        {
          title: 'Freelancers',
          desc: 'Get paid instantly and manage earnings securely.',
        },
        {
          title: 'Merchants',
          desc: 'Accept digital payments with fast settlements.',
        },
        {
          title: 'Families',
          desc: 'Transfer money safely to loved ones anytime.',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg 
                     hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-3 text-[#C8A978]">
            {item.title}
          </h3>
          <p className="text-sm opacity-80">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Footer Line */}
    <div className="mt-20 text-center text-[#C8A978] animate-pulse">
      One wallet • Multiple use cases
    </div>

  </div>
</section>

{/* Scroll Hint */}


    </div>
  )
}

export default Home
