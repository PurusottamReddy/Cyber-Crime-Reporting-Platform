import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/AppContext';

const Home = () => {
  const { navigate } = useContext(UserContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Animated background particles
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(64, 224, 208, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ zIndex: 0 }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20" style={{ zIndex: 1 }}>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Glowing Lines Animation */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* CyberLens Logo/Title */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                CyberLens
              </span>
              <span className="block text-cyan-400 text-2xl sm:text-3xl mt-2 font-light tracking-widest animate-pulse">
                 CYBER INTELLIGENCE PLATFORM
              </span>
            </h1>
          </div>

          {/* Main Title & Subtitle */}
          <div className="text-center mb-16 max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Empowering Citizens Against{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Cybercrime
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-cyan-200 font-light tracking-wide">
              Report, Track, and Protect — with CyberLens
            </p>
          </div>

          {/* 3D Shield Animation */}
          <div className="mb-16 animate-float">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-spin-slow" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-4 border-4 border-purple-400 rounded-full animate-spin-slow" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🛡️</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-20 animate-slide-up-delay">
            <button
              onClick={() => navigate('/report-cc')}
              className="group relative px-8 py-4 text-lg font-bold text-cyan-400 border-2 border-cyan-400 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(64,224,208,0.5)]"
            >
              <span className="relative z-10">Report Cybercrime</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-cyan-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>

            

            <button
              onClick={() => navigate('/look-up')}
              className="group relative px-8 py-4 text-lg font-bold text-blue-400 border-2 border-blue-400 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(96,165,250,0.5)]"
            >
              <span className="relative z-10">Fraud Lookup</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-blue-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Key Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Card 1 */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-8 hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(64,224,208,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
              <div className="relative z-10">
                <div className="text-5xl mb-4 animate-bounce-slow">📝</div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Report Submission</h3>
                <p className="text-gray-300 leading-relaxed">
                  Submit detailed cybercrime reports with evidence. Our secure system ensures your information is protected and processed efficiently.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-xl p-8 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
              <div className="relative z-10">
                <div className="text-5xl mb-4 animate-bounce-slow" style={{ animationDelay: '0.2s' }}>🔍</div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Fraud Lookup Tool</h3>
                <p className="text-gray-300 leading-relaxed">
                  Verify suspicious entities by searching phone numbers, emails, or websites. Instantly check if they've been reported before.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-blue-400/30 rounded-xl p-8 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(96,165,250,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
              <div className="relative z-10">
                <div className="text-5xl mb-4 animate-bounce-slow" style={{ animationDelay: '0.4s' }}>👮</div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Authority Management</h3>
                <p className="text-gray-300 leading-relaxed">
                  Authorities can manage reports, update case statuses, and track investigations 
                  to ensure timely resolutions and effective crime prevention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Platform Overview
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="text-4xl animate-pulse">🔐</div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">Secure Authentication</h3>
                    <p className="text-gray-300">Role-based access control ensures users and authorities have appropriate permissions for their responsibilities.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="text-4xl animate-pulse" style={{ animationDelay: '0.3s' }}>📊</div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-2">Report Tracking</h3>
                    <p className="text-gray-300">Track the status of your submitted reports in real-time. Authorities can update case statuses and manage investigations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="text-4xl animate-pulse" style={{ animationDelay: '0.6s' }}>🛡️</div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Secure & Reliable</h3>
                    <p className="text-gray-300">Built with security in mind. Your data is protected throughout the reporting and investigation process.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 border border-cyan-400/20 rounded-lg hover:border-cyan-400 transition-colors">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">100K+</div>
                      <div className="text-sm text-gray-400">Reports</div>
                    </div>
                    <div className="p-4 border border-purple-400/20 rounded-lg hover:border-purple-400 transition-colors">
                      <div className="text-3xl font-bold text-purple-400 mb-2">45K+</div>
                      <div className="text-sm text-gray-400">Resolved</div>
                    </div>
                    <div className="p-4 border border-blue-400/20 rounded-lg hover:border-blue-400 transition-colors">
                      <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                      <div className="text-sm text-gray-400">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
